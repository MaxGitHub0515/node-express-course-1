
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        //  If no token, just return null. DO NOT throw an error or 401.
        // This lets the frontend hook setAuthUser(null) peacefully.
        if (!token) {
            return res.status(200).json(null);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userID).select("-pwd");

        if (!user) {
            return res.status(200).json(null);
        }

        // 2. If user exists, return the data
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.log("Error in auth verify:", error.message);
        // On error (expired token, etc), return null so the frontend clears the user
        res.status(200).json(null);
    }
});

export default router;