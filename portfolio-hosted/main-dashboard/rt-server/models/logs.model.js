import mongoose from "mongoose";


const LogSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String, 
        enum: ['login', 'logout'],
        required: true
    }
}, {timestamps:true})