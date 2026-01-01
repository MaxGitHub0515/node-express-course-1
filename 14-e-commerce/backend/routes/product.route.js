
import express from "express";
const router = express.Router();
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";
import {
    getAllProducts,
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct
} from "../controllers/product.controller.js";

router.get("/", protectRoute, adminRoute, getAllProducts);

router.get("/featured", getFeaturedProducts);

router.get("/recommendations", getRecommendedProducts);

router.get("/category/:categoryId", getProductsByCategory);

router.post("/", protectRoute, adminRoute, createProduct);

router.delete("/:productId", protectRoute, adminRoute, deleteProduct);

router.patch("/:productId", protectRoute, adminRoute, toggleFeaturedProduct);

export default router;