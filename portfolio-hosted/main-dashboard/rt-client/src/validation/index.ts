/* CENTRALIZED EXPORT OF ALL VALIDATION SCHEMAS */
/* FIRST LAYER OF INPUT VALIDATION BEFORE SENDING TO BACKEND */

import * as Yup from 'yup';
import { contactSchema } from './contactSchemas';
import { logInSchema, signUpSchema } from './authSchemas';

export {
    Yup,
    contactSchema,
    logInSchema,
    signUpSchema
};