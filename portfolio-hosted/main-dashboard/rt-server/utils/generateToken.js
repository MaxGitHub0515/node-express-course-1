
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' });

const generateTokenAndSetCookie = (userID, res) => {
    if(!process.env.JWT_SECRET){
        throw new Error("jwt secret not defined in env ")
    }
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    // Sending jwt into cookie
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // total in ms
        httpOnly:true, // prevent xss - cookie is not accessible via js
        sameSite: 'strict', // prevent csrf - cookie is not sent with cross-origin requests
        secure: process.env.NODE_ENV === 'production', // only send cookie over https in production

    })
}


export default generateTokenAndSetCookie;
