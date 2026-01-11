
import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    getCoupon,
    validateCouponCode
} from "../controllers/coupon.controller.js";

router.get("/", protectRoute, getCoupon);
router.get("/validate", protectRoute, validateCouponCode);
export default router;