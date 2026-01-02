import Coupon from "../models/coupon.model.js";
import { StatusCodes } from "http-status-codes";

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({userId: req.user._id, isActive: true});
        res.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

// validate coupon code: expired, usage limit etc. - a lot of implications
export const validateCouponCode = async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({code, userId: req.user._id, isActive: true});
        if(!coupon) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Coupon not found"});
        }
        if(coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Coupon has expired"});
        }
        res.json({message: "Coupon is valid", code: coupon.code, discountPercentage: coupon.discountPercentage});
    } catch (error) {
        console.log("Error in validateCouponCode:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}


