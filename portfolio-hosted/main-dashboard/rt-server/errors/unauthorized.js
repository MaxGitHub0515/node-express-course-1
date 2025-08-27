
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";

export default class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}