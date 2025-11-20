
// Using express validator instead of Joi
import {body} from "express-validator";

export const authValidator = [
    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    body("pwd")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
        // .matches(/\d/).withMessage("Password must contain a number")
        // .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter");

    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({min: 3, max:24}).withMessage("Username must be at least 3 and 24 characters long"),

    body("confirmPwd")
        .notEmpty().withMessage("Confirm Password is required")
        .custom((value, { req }) => value === req.body.pwd).withMessage("Passwords do not match"),

    ];
