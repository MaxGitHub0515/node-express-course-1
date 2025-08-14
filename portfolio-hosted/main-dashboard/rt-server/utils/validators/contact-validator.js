

// Validation for Contact Page

import Joi from "joi";

const schemaJoi = Joi.object({
    email: Joi.string()
        .email({maxDomainSegments: 2, tlds: { allow: ['com', 'net']} })
        .required(),
    subject: Joi.string()
        .min(6)
        .max(50)
        .trim()
        .required(),
    message: Joi.string()
        .max(2000)
        .trim()
        .required(),

})


export default schemaJoi;


