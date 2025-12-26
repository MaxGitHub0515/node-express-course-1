

// Validation for Contact Page

import Joi from "joi";

const contactValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    subject: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .required(),
    message: Joi.string()
        .max(2000)
        .trim()
        .required(),

})


export default contactValidator;


