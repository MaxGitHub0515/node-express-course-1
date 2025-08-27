
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
/* Custom Errors */
import UnauthorizedError from "../errors/unauthorized.js";
import BadRequestError from "../errors/bad-request.js";
/* utils */
import generateTokenAndSetCookie from "../utils/auth/generateToken.js";

/* Auth Contoller */
export const SignUp = async (req, res, next) => {
    try{
        // for future implemntation if adding a user functionality(like confirmPwd field etc  +  user dashboard
        // for now I will keep it simple - admin only
        const {username, pwd, email} = req.body;    
       
        const user = await User.findOne({username});
        if(user) {
            throw new BadRequestError("Such user already exists");
        }
        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd, salt);

        const addNewUser = await User.create({
            username,
            email,
            pwd:hashedPwd
        })
        if(addNewUser){
        generateTokenAndSetCookie(addNewUser._id, res);
        await addNewUser.save()
        res.status(201).json({
            _id: addNewUser._id,
            username: addNewUser.username,
            email:  addNewUser.email
            
        })
        } else {
            throw new BadRequestError("Invalid user data");
        }
     
    } catch (error) {
        console.log("Error in signup controller", error.message);
        next(error);
    }

}
/*
 on login/signup, a new JWT is generated and set in a cookie (session starts).
 On logout, the cookie is cleared, so the JWT is gone (session ends).
*/

export const LogIn = async(req, res, next) => {
    try{
    const {username, pwd, email} = req.body;
    // in order to compare passwords you first need to find a user in db 
    const user = await User.findOne({ username, email }).maxTimeMS(15000);

    //if undefined or null compare with empty string = wont throw an error
    const isPasswordCorrect = await bcrypt.compare(pwd, user?.pwd || "") 
    // if any of them is false
    if(!user || !isPasswordCorrect) {
        throw new UnauthorizedError("Invalid user credentials");
    }
    generateTokenAndSetCookie(user._id, res);
    
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email:  user.email
        
    })
    } catch (error) {
        console.log("Error in login controller", error.message, error.stack);
        // better to pass errors to the centrilized error handler
        next(error)
       
        
    }
}


export const LogOut = async(req, res, next) => {
    try{
        res.cookie("jwt", "", {
            httpOnly:true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 0
        })
        res.status(200).json({
            message : "Log out Successfully"
        })
    } catch (error) {
        console.log("Error in logout controller", error.message, error.stack);
        next(error);
    }
}
