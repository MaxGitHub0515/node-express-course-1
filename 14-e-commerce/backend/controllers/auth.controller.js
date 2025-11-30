
import {StatusCodes} from "http-status-codes";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
     const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m"
     });
     const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "7d"
     });
     return {accessToken, refreshToken};
}
const storeRefreshToken = async (userId, refreshToken) => {
     await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60); // expire the refresh token in 7 days - store in redis
}
const setCookies = (res, accessToken, refreshToken) => {
     res.cookie("accessToken", accessToken, {
          httpOnly: true, // prevent XSS attacks
          maxAge: 15 * 60 * 1000, // cookie lives 15 minutes - ms format only
          sameSite: "strict", // prevent CSRF attacks - cross-site request forgery
          secure: process.env.NODE_ENV === "production"
});
     res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // cookie lives 7 days - ms format only
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production"
     });
}

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
               _id: user._id,
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
  try {
     const {email, password} = req.body;
     const user = await User.findOne({email});
     if(user && (await user.comparePwd(password))) {
          const {accessToken, refreshToken} = generateTokens(user._id);
          await storeRefreshToken(user._id, refreshToken);
          // sending cookies
          setCookies(res, accessToken, refreshToken);

     res.status(StatusCodes.OK).json({
          user: {
               _id: user._id,
               username: user.username,
               email: user.email,
               role: user.role
          }
     }) 
     } else {
     res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid email or password"});
     }
       
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});

  }
}

export const LogOut = async (req, res) => {
     try {
          const refreshToken = req.cookies.refreshToken;
          if(refreshToken) {
               const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
               await redis.del(`refresh_token:${decoded.userId}`);
               res.clearCookie("accessToken");
               res.clearCookie("refreshToken");
               res.status(StatusCodes.OK).json({message: "Logged out successfully"});
          }

     } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
     }
     
}

// this will be used to refresh/recreate/resign access tokens when they expire
export const refreshToken = async (req, res) => {
     try {
          // requesting cookies
          const refreshToken = req.cookies.refreshToken;
          if(!refreshToken) {
               return res.status(StatusCodes.UNAUTHORIZED).json({message: "No refresh token provided"});
          }
          const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          const storedRefreshToken = await redis.get(`refresh_token:${decoded.userId}`);
          if(storedRefreshToken !== refreshToken) {
               return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid refresh token"});
          }
          const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {
               expiresIn: "15m"
          });
          // send new access token as cookie
          res.cookie("accessToken", accessToken, {
               httpOnly: true,
               maxAge: 15 * 60 * 1000,
               sameSite: "strict",
               secure: process.env.NODE_ENV === "production"
          });
          res.status(StatusCodes.OK).json({message: "Access token refreshed"}
          )

     } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
     }
}

// TODO: Implement getProfile
export const getProfile = async (req, res) => {
     try {
          
     } catch (error) {
          
     }
}
