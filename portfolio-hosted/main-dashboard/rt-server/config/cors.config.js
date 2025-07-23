
import cors from "cors";

const configCors = () => {
    return cors({
        origin: (origin, callback) =>{
            console.log('Incoming Origin:', origin);
            const allowedOrigins = [
                'http://localhost:3000', // front in development
                'http://localhost:5000',
                'https://illustrates.info' // front in production

            ]
      
            if(!origin || allowedOrigins.includes(origin)) {
                callback(null, true) // if true - request is allowed
            } else {
                callback(new Error("Not allowed by cors"))
            }
        },
        //which HTTP actions users (or other websites) are allowed to perform on your server.
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        // headers client can send in requests
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept-Version',
            
        ],
        // headers client can see in the response
        exposedHeaders: [
            "X-Request-ID", // - needed?
            "X-RateLimit-Limit",
            "X-RateLimit-Remaining"
        ],
        // Allow cookies to be sent with requests (if using session cookies or JWT with HttpOnly cookies)
        credentials:true,
        // cors will authomatically handle it if false
        preflightContinue:false,
        maxAge: 600, // Cache preflight response for 10 minutes
        optionsSuccessStatus: 204, // ok/successful options requests


    })
}

export default configCors;