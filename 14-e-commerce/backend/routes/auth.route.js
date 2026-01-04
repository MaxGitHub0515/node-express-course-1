
import express from "express";

const router = express.Router();

import {
    LogIn, SignUp, LogOut, refreshToken,
    getProfile
} from "../controllers/auth.controller.js"

import {protectRoute} from "../middleware/auth.middleware.js"
router.post('/login', LogIn)

router.post('/signup', SignUp)

router.post('/logout', LogOut)

router.post("/refresh-token", refreshToken)
// check if user is authenticated to get access to the profile page
router.get("/profile", protectRoute, getProfile)

export default router;