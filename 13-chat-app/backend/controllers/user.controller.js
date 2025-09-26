import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // $ne for not including yourself in the sidebar unless 
        // think about save messages 
        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        return res.status(StatusCodes.OK).json({
            filteredUser
        })
    } catch (error) {
        console.log("Error in user controller: ", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error"
        })
    }
}