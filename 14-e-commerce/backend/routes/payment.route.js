
import express from "express";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    createCheckoutSession,
    checkoutSuccess
} from "../controllers/payment.controller.js";

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
// check if checkout is successful
router.post("/checkout-success", protectRoute, checkoutSuccess);
export default router;