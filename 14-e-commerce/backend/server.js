

import express from "express";
import dotenv from "dotenv";
import "colors";
import {connectDB} from "./lib/db.js"
// 3:36
const app = express();
dotenv.config({path: ".env.local"})

// Routes imports 
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

// default middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ENDPOINTS
app.use("/api/v1/auth", authRoutes);
app.use("api/v1/products", productRoutes);
app.use("api/v1/cart", cartRoutes);
app.use("api/v1/coupons", couponRoutes);
app.use("api/v1/payments", paymentRoutes);
app.use("api/v1/analytics", analyticsRoutes);

const PORT = process.env.PORT || 8001;

const Start = (() => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    connectDB();

})();


