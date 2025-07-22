
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const SignUp = async(req,res) => {
    try{
        // for future implemntation if adding a user functionality(like confirmPwd field etc  +  user dashboard
        // for now I will keep it simple - admin only
        const {username, pwd, email, confirmPwd} = req.body;    
        if(pwd !== confirmPwd) {
            return res.status(400).json({e: "Passwords do not match"});
        }
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({msg: "Such user already exists"})
        }
        // Password Hasing
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
            res.status(400). json({err: "Invalid user data"})
        }
     
    } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({e: "Internal Server Error in SignUp"})
    }

}
/*
 on login/signup, a new JWT is generated and set in a cookie (session starts).
 On logout, the cookie is cleared, so the JWT is gone (session ends).
*/

export const LogIn = async(req, res) => {
    try{
    const {username, pwd, email} = req.body;
    // in order to compare passwords you first need to find a user in db 
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return res.status(401).json({ msg: "Invalid user credentials" });
}

    //if undefined or null compare with empty string = wont throw an error
    const isPasswordCorrect = await bcrypt.compare(pwd, user.pwd);
    // if any of them is false
    if(!isPasswordCorrect) {
        return res.status(401).json({msg: "Invalid user credentials"});

    }
    generateTokenAndSetCookie(user._id, res);
    
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email:  user.email
        
    })
    } catch (error) {
        console.log("Error in login controller", error.message, error.stack);
        res.status(500).json({e: "Internal Server Error in Login"})
    }
}


export const LogOut = async(req, res) => {
    try{
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).json({
            message : "Log out Successfully"
        })
    } catch (error) {
        console.log("Error in logout controller", error.message, error.stack);
        res.status(500).json({e: "Internal Server Error in Logout"})
    }
}
