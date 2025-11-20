
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";

export default class BadRequestError extends CustomAPIError {
    constructor(message, errors = []) {
        super(message, StatusCodes.BAD_REQUEST);
        this.errors = errors;
    }
}