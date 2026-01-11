import { StatusCodes } from "http-status-codes";
import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
export const createCheckoutSession = async (req, res) => {
    try {
       const {products, couponCode} = req.body;
       // check if products in array format
         if(!Array.isArray(products) || products.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid or empty products array"});
         }
        let totalAmount = 0;
        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100); // convert to cents- stripe requires
            totalAmount += amount * product.quantity;
            // adding euro currency support
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                }
            }
        });
        let coupon = null;
        if(couponCode) {
            coupon = await Coupon.findOne({code: couponCode, userId: req.user._id, isActive: true});
            if(coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment', // one-time payment: could be 'subscription'
            success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
            discounts: coupon ? [{
                coupon: await createStripeCoupon(coupon.discountPercentage)
            }] : [],
            // fields extraction for sessions
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode ||  ''
            },
            products: JSON.stringify(
                products.map(p => ({
                    id: p._id,
                    quantity: p.quantity,
                    price: p.price
                }))
            ),
        });
        // if buying 200$ or more - issue coupon
        if(totalAmount >= 20000) { // cents
            await createNewCoupon(req.user._id);
        }
        res.status(StatusCodes.OK).json({id: session.id, totalAmount: totalAmount / 100}); // convert back to euros

    } catch (error) {
        console.log("Error processing checkout session:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }

}

async function createStripeCoupon(discountPercentage) {
    try {
        const coupon = await stripe.coupons.create({
            percent_off: discountPercentage,
            duration: 'once'
        });
        return coupon.id;
    } catch (error) {
        console.error("Error creating Stripe coupon:", error);
        throw new Error("Could not create Stripe coupon");
    }
}

async function createNewCoupon(userId) {
    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10, // change as needed
        expirationDate: new Date(Date.now() + 30*24*60*60*1000), // 30 days from now
        userId: userId,
    });
    await newCoupon.save();
    return newCoupon;
}

// ------- CHECKOUT SUCCESS CHECK ------
export const checkoutSuccess = async (req, res) => {
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session.payment_status === "paid") {
            if(session.metadata.couponCode) {
                await Coupon.findOneAndUpdate({
                    code: session.metadata.couponCode,
                    userId: session.metadata.userId
                }, {
                    isActive: false
                });
            }
        }
        // after sucessful payment; convert into js object
        const products = JSON.parse(session.metadata.products);
        const newOrder = new Order({
            user: session.metadata.userId,
            // p - product
            products: products.map(p => ({
                productId: p.id,
                quantity: p.quantity,
                price: p.price
            })),
           totalAmount: session.amount_total / 100, // back to euros
           stripeSessionId: sessionId,
           status: "Paid"
        });
        await newOrder.save();
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Payment successful, order created, and coupon deactivated if used",
            orderId: newOrder._id
        });


    } catch (error) {
        console.error("Error in handleCheckoutSuccess:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}