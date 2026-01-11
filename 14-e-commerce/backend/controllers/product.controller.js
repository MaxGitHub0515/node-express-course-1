
import Product from "../models/product.model.js";
import {redis} from "../lib/redis.js";
import {StatusCodes} from "http-status-codes";
import cloudinary from "../lib/cloudinary.js";
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        console.log("Error in getAllProducts:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if(featuredProducts) {
            return res.status(StatusCodes.OK).json(JSON.parse(featuredProducts));
        }
        // If not in cache, fetch from DB
        // lean() to get plain JS objects instead of Mongoose documents - performance optimization
        featuredProducts = await Product.find({isFeatured: true}).lean();
        if(!featuredProducts) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "No featured products found"})
        }
        // Store in Redis cache for future requests
        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts);

    } catch (error) {
        console.log("Error in getFeaturedProducts:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category } = req.body;
        let cloudinaryRes = null; 
        if(image) {
            // upload image to cloudinary
            cloudinaryRes = await cloudinary.uploader.upload(image, {
                folder: "e-commerce/products"
            });
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : '',
            category
        });
        res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
        console.log("Error in createProduct:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(!product) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Product not found"});
        }
        if(product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]; // extract public ID from URL
            try {
                await cloudinary.uploader.destroy(`e-commerce/products/${publicId}`);
                console.log("Image deleted from Cloudinary");
            } catch (error) {
                console.log("Error in deleting image from Cloudinary:", error.message);
            }
        }
        await Product.findByIdAndDelete(req.params.productId);
        res.status(StatusCodes.OK).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log("Error in deleteProduct:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 3 } }, // get 3 random products
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1
                }
            }

        ])
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

export const getProductsByCategory = async (req, res) => {
    const {categoryId} = req.params;
    try {
        const products = await Product.find({categoryId});
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        console.log("Error in getProductsByCategory:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.status(StatusCodes.OK).json(updatedProduct);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({message: "Product not found"});
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server Error", error: error.message});
    }
}

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({isFeatured: true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in updateFeaturedProductsCache:", error.message);
    }
}