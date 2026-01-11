
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
   try {
       const accessToken = req.cookies.accessToken;
       if(!accessToken) {
           return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized - No access token provided"})
       }
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized - User not found"})
        }
        req.user = user;
        next();
      } catch (error) {
         if(error.name === "TokenExpiredError") {
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized - Acess token expired"});
         }
         throw error
      }
   } catch (error) {
       console.log("Error in protectRoute middleware:", error.message);
       return res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized - Invalid Access Token"})
        }
};

export const adminRoute = (req, res, next) => {
    if(req.user && req.user.role === process.env.ADMIN_ROLE) {
        next();
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({message: "Access denied - Admins only"})
    }
}
