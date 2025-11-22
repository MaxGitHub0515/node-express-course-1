/* INPUT VALIDATION FOR AUTH SCHEMAS USING YUP */
/* FIRST LAYER OF INPUT VALIDATION BEFORE SENDING TO BACKEND */

// REWRITE THE VALIDATION ACCORDINGLY FOR AUTH SCHEMAS BELOW !!!! <<------

import { Yup } from './';

export const logInSchema = Yup.object({
        username: Yup.string()
         .required("Username is required")
         .min(3, "Username must contain at least 3 characters")
         .max(24),
        pwd: Yup.string()
            .min(12, "Password should be at least 12 characters long")
            .required("Password is required")
            .matches(/\d/, "Password must contain numbers")
            .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, "Must contain at least one uppercase and one lowercase letter")
            .matches(/[!@#$%^&*(),.?":{}|<>_\-]/, "Must contain must contain special characters"),
            
        //   confirmPwd: Yup.string()
        //     .oneOf([Yup.ref('pwd'), null], "Passwords must match")
        //     .required("Confirm Password is required"),
        email: Yup.string()
        .email('Invalid Email').required('Email is required')
        .matches( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email")
    });


export const signUpSchema = Yup.object({
        username: Yup.string()
         .required("Username is required")
         .min(3, "Username must contain at least 3 characters")
         .max(24),
        pwd: Yup.string()
            .min(12, "Password should be at least 12 characters long")
            .required("Password is required")
            .matches(/\d/, "Password must contain numbers")
            .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, "Must contain at least one uppercase and one lowercase letter")
            .matches(/[!@#$%^&*(),.?":{}|<>_\-]/, "Must contain must contain special characters"),
            
        confirmPwd: Yup.string()
            .oneOf([Yup.ref('pwd')], "Passwords must match")
            .required("Confirm Password is required"),
        email: Yup.string()
        .email('Invalid Email').required('Email is required')
        .matches( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email")
    });



