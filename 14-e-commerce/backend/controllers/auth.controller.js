
import {StatusCodes} from "http-status-codes";


export const SignUp = async (req, res) => {
    res.json({msg: "Here is a sign up page"});
}

export const LogIn = async (req, res) => {
     res.json({msg:"Here is a Log In page"})
}

export const LogOut = async (req, res) => {
     res.send("Here is a Log out page")
}


