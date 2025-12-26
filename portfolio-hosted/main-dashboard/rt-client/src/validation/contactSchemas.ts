/* INPUT VALIDATION FOR CONTACT FORM */
/* FIRST LAYER OF INPUT VALIDATION BEFORE SENDING TO BACKEND */


import * as Yup from "yup";

export const contactSchema = Yup.object({
    email: Yup.string()
        .email('Invalid Email').required('Email is required').trim(),
    subject: Yup.string()
        .min(3, 'Subject must be at least 3 characters')
        .max(50, 'Subject cannot exceed 50 characters')
        .required('Subject is required')
        .trim(),
    message: Yup.string()
        .max(2000, 'Message exceeded the amount of allowed characters')
        .required('Message is required')
        .trim()
});