
import express from "express";

const router = express.Router();

import {
    LogIn, SignUp, LogOut
} from "../controllers/auth.controller.js"

router.post('/login', LogIn)

router.post('/signup', SignUp)

router.post('/logout', LogOut)


export default router;