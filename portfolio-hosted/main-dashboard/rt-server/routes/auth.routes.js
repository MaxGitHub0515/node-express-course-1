

import express from "express";

const router = express.Router();

import {
    LogIn, 
    SignUp,
    LogOut

} from "../controllers/auth.controller.js"

// for future usage
router.post("/signup", SignUp);

router.post("/login", LogIn);
router.post("/logout", LogOut);

export default router;
