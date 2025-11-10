
import {StatusCodes} from "http-status-codes";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
     const accessToken = jwt.sign({userId}, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "15m"
     });
     const refreshToken = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET, {
          expiresIn: "7d"
     });
     return {accessToken, refreshToken};
}
const storeRefreshToken = async (userId, refreshToken) => {
     await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60); // 7 days expiration - store in redis
}
const setCookies = (res, accessToken, refreshToken) => {
     res.cookie("accessToken", accessToken, {
          httpOnly: true, // prevent XSS attacks
          maxAge: 15 * 60 * 1000, // cookie lives 15 minutes
          sameSite: "strict", // prevent CSRF attacks
          secure: process.env.NODE_ENV === "production"
})};
export const SignUp = async (req, res) => {
     const {email, password, username} = req.body;
     try {
     const userExists = await User.findOne({
          $or: [{username}, {email}] // replace on Firebase OAuth method : generate username if needed or use default specs provided by firebase ids, displayname etc
     });
     if(userExists) {
          return res.status(StatusCodes.BAD_REQUEST).json({message: "Such username or email already exists"}); // should be improved with custom error class or additional library for error handling 
     }
     const user = await User.create({
          username,
          email,
          password
     })
     // authenticate
     const {accessToken, refreshToken} = generateTokens(user._id);
     await storeRefreshToken(user._id, refreshToken);
     setCookies(res, accessToken, refreshToken);

     res.status(StatusCodes.CREATED).json({
          user: {
               id: user._id,
               username: user.username,
               email: user.email,
               role: user.role
          },
          message: "User was created successfully"
     })
     } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
     }
     
}

export const LogIn = async (req, res) => {
     res.json({msg:"Here is a Log In page"})
}

export const LogOut = async (req, res) => {
     res.send("Here is a Log out page")
}


