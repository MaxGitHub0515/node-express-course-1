
import {StatusCodes} from "http-status-codes";
import User from "../models/user.model.js";

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
     res.status(StatusCodes.CREATED).json({
          user,
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


