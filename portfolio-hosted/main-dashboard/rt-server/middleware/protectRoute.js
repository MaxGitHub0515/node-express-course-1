

// protect user from getting access to admin dash

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req, res, next) => {
    try{
        const token = req.cookies.jwt; // get and parse the cookie
        if(!token) {
            return res.status(401).json({
                e: "Unauthorized: No Token Provided"
            })

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
             if(!decoded) return res.status(401).json({e:"Unauthorized: Invalid Token"});
        }
        // userID taken from generateToken.js when signing jwt
        const user = await User.findById(
            // ??
            decoded.userID 
        ).select("-pwd");
        if(!user) return res.status(404).json({e: 'User Not FOund'})
        
        req.user = user;

        return next();
    } catch(error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({e: "Internal Server Error"})
    }
} 

export default protectRoute;
