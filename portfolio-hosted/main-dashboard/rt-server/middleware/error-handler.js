

import {StatusCodes} from 'http-status-codes';  
import CustomAPIError from '../errors/custom-api.js';

export default function errorHandlerMid(err, req, res, next) {
    const isProduction = process.env.NODE_ENV === 'production';
    const message = err.message || 'An unexpected error occurred';
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timestamp = now.toLocaleString('en-GB', { timeZone,  hour12:false })
    
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors, // validation errors
            stack: isProduction ? null : err.stack,
            timestamp: isProduction ? now.toISOString() : timestamp,
        })
    }
     const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        
        return res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
            stack: isProduction ? null : err.stack,
            timestamp: isProduction ? now.toISOString() : timestamp,
        });
    }
    


