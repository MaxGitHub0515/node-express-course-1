
import express from "express";

const router = express.Router();

import {
<<<<<<< HEAD
    LogIn, SignUp, LogOut, refreshToken
=======
    LogIn, SignUp, LogOut, refreshToken,
    getProfile
>>>>>>> app/separate
} from "../controllers/auth.controller.js"

import {protectRoute} from "../middleware/auth.middleware.js"
router.post('/login', LogIn)

router.post('/signup', SignUp)

router.post('/logout', LogOut)

<<<<<<< HEAD
router.post('/refresh-token', refreshToken)
=======
router.post("/refresh-token", refreshToken)
// check if user is authenticated to get access to the profile page
router.get("/profile", protectRoute, getProfile)
>>>>>>> app/separate

// TODO: protected route example
// router.get('/profile', getProfile)

export default router;

// 1:20
