

import { validationResult } from "express-validator";
import BadRequestError from "../errors/bad-request.js";
export default function validateRequest(req, res, next) {
    // gather validator results
    // if there are errors, validation fails - 400
    const errors = validationResult(req); // fetches errs from req
    if(!errors.isEmpty()) {
        throw new BadRequestError({errors: errors.array})    }
    next();
}
