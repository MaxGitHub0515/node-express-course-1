
import {StatusCodes} from "http-status-codes";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
// reusable Error handling function for the catch block

export const contollerErrorCatch = (res, error, fuName) => {
     console.log(`Error in ${fuName} controller:`, error.message)
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messsage: "Server Error", error: error.message});
}

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
          contollerErrorCatch(res, error, SignUp.name)
     }
     
}

export const LogIn = async (req, res) => {
<<<<<<< HEAD
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
=======
     try {
     const {email, password} = req.body;
     const user = await User.findOne({email});
     if(user && (await user.comparePwd(password))) {
     const {accessToken, refreshToken} = generateTokens(user._id);
     await storeRefreshToken(user._id, refreshToken);
     setCookies(res, accessToken, refreshToken);
     res.json({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
     });
     } else {
          res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid email or password"})
     }
     } catch (error) {
          contollerErrorCatch(res, error, LogIn.name)
     }
   }

>>>>>>> app/separate

export const LogOut = async (req, res) => {
     try {
          const refreshToken = req.cookies.refreshToken;
          if(refreshToken) {
<<<<<<< HEAD
               const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
               await redis.del(`refresh_token:${decoded.userId}`);
               res.clearCookie("accessToken");
               res.clearCookie("refreshToken");
               res.status(StatusCodes.OK).json({message: "Logged out successfully"});
          }

     } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
     }
     
=======
               //  get the id using decoding; to encode that userid was primaryly used together with secret; now we extract it 
               const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
               // remove from redis
               await redis.del(`refresh_token: ${decoded.userId}`);
          }
          // auth related cookies removal
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
          // ui message
          res.json({message: "Logged out successfully!"})
     } catch (error) {
          contollerErrorCatch(res, error, LogOut.name)  
     }
}
// Refresh the access token with "refresh token";
export const refreshToken = async (req, res) => {
     try {
          const refreshToken = req.cookies.refreshToken;
          if(!refreshToken) {
               return res.status(StatusCodes.UNAUTHORIZED).json({message: "Nop refresh token provided"});
          }
          // make decoded as helper funciton
          const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
          if(decoded !== storedToken) {
               return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid refresh token"
               })
          }
          const accessToken = jwt.sign({userId: decoded.userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: "15m"})
          // .cookie("cookieName", data_as_string, {options})
          res.cookie("accessToken", accessToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict", // CSRF protection
               maxAge: 15 * 60 * 1000, // 15m
          })
     } catch (error) {
          contollerErrorCatch(res, error, refreshToken.name)  
     }
}

export const getProfile = async (req, res) => {
     try {
          res.json(req.user)
     } catch (error) {
          contollerErrorCatch(res, error, getProfile.name)  
     }
>>>>>>> app/separate
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

<<<<<<< HEAD
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
=======
// PROCESS:
/* LOG IN
1. User sends login request with email and password
2. Server verifies credentials
3. If valid, server generates access and refresh tokens
4. Server stores refresh token in Redis with user ID as key
5. Server sets access and refresh tokens as HTTP-only cookies in the response
6. Client uses access token for authenticated requests
7. When access token expires, client can use refresh token to get a new access token
8. On logout, server can delete the refresh token from Redis and clear cookies
*/

//  LOG OUT
// 1. - User logs out manually
// 2. - The server deletes the refresh token both from Redis & inside the browser cookies
// 3. - And removes browser access token cookie as well

// EXAMPLES OF USER BEHAVIOR:
// 1. 
//  - CLosed the browser tab -> access token gone (short-lived) , refresh token still valid (long-lived)
//  - User opens the page again e.g day later or two
//  - The frontend tries to fetch the data - the request fails due to missing/expired access token
//  - The frontend does auto-refresh e.g by calling endpoint /auth/refresh-token
//  - The server sees the refresh token cookie, which is e.g 1 day old and checks it against the token stored in Redis (comparation - redis vs cookie)
//  - Success - The server issues a new Access token which will fail again in 15, then using refresh token - which is valid for 7 days


>>>>>>> app/separate
