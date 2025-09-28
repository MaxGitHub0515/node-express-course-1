import User from "../models/user.model.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async(req, res) => {
   try {
  
    const {fullName, username, pwd, confirmPwd, gender} = req.body;
    // if the passwords are matching
    if(pwd !== confirmPwd) {
        return res.status(StatusCodes.BAD_REQUEST).json({error:"Passwords do not match"})
    }
    // if such username already present in db
    const user = await User.findOne({username});
    if(user) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Such username already exists"})
    }
    // hashing pwd,  10 rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    
    // https://avatar.iran.liara.run/public
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // instead of User.create()
    // for newUser, what inside model is now equal to credentials pasted in by user
    // e.g fullName(from db): fullName(send by user)
    // fullName: fullName
    // propertyforDB : propertyFromCLientSent = better to call them the same to use shortcut for object which names are the same 
    // instead of fullName: fullName
    const newUser = new User({
        fullName,
        username,
        pwd:hashedPwd,
        gender, 
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })

   if(newUser) {
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    //  get from database already stored data: check
    res.status(StatusCodes.CREATED).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username, 
        profilePic: newUser.profilePic
    })
   } else {
    res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid user data"})
   }

   } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
    
   }
}
export const login = async(req, res) => {
    try{            
    const {username, password} = req.body;
     // in order to compare passwords you first need to find a user in db 
    const user = await User.findOne({username});
    //if undefined or null compare with empty string = wont throw an error
    // if any of them is false
    const isPasswordCorrect = await bcrypt.compare(password, user?.pwd || "") // 
    if(!user || !isPasswordCorrect) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid user credentials"})
    }
    
    generateTokenAndSetCookie(user._id, res)
    res.status(StatusCodes.OK).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username, 
        profilePic: user.profilePic
    })

    }catch (error) {
        console.log("Error in login controller", error.message, error.stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
       }
}
export const logout  = async(req, res) => {

    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(StatusCodes.OK).json({
            msg: "Logged out Successfully"
        })

    }catch (error) {
        console.log("Error in logout controller", error.message, error.stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
   
        
       }
    
}