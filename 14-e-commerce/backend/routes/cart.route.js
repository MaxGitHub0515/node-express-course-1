
import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    addToCart,
    removeAllFromCart,
    updateQuantity,
    getCartProducts
} from "../controllers/cart.controller.js";

router.get("/", protectRoute, getCartProducts);

router.post("/", protectRoute, addToCart);

router.delete("/", protectRoute, removeAllFromCart);

router.put("/:id", protectRoute, updateQuantity);

export default router;