
// Instead of express validator - Joi z
import {body} from "express-validator";

const emailValidator = body("email")
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email");

const pwdValidator = body("pwd")
    .notEmpty().withMessage("Password is required")
    .isLength({min: 6}).withMessage("Password must be at least 6 characters long")
    // .matches(/\d/).withMessage("Password must contain a number")
    // .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter");

const unameValidator = body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({min: 3, max:24}).withMessage("Username must be at least 3 and 24 characters long");

const confirmPwdValidator = body("confirmPwd")
  .notEmpty().withMessage("Confirm Password is required")
  .custom((value, { req }) => value === req.body.pwd).withMessage("Passwords do not match");

export const validateSignUp = [
    unameValidator,
    emailValidator,
    pwdValidator,
    confirmPwdValidator
]


export const validateLogin = [
    unameValidator,
    emailValidator,
    pwdValidator
]