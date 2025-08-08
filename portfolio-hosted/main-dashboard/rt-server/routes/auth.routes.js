

import express from "express";

const router = express.Router();
import { validateSignUp, validateLogin } from "../utils/validators/auth-validator.js";
import protectRoute from "../middleware/protectRoute.js";
import validateRequest from "../middleware/validate-request.js";
import {
    LogIn, 
    SignUp,
    LogOut

} from "../controllers/auth.controller.js"

// for future usage
router.post("/signup", validateSignUp, validateRequest, SignUp);

router.post("/login", validateLogin, validateRequest, LogIn);
router.post("/logout", protectRoute, LogOut);

export default router;
