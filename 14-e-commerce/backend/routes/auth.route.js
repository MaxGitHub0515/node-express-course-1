
import express from "express";

const router = express.Router();

import {
    LogIn, SignUp, LogOut, refreshToken
} from "../controllers/auth.controller.js"

router.post('/login', LogIn)

router.post('/signup', SignUp)

router.post('/logout', LogOut)

router.post('/refresh-token', refreshToken)

// TODO: protected route example
// router.get('/profile', getProfile)

export default router;

// 1:20
