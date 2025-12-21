
import mongoose from "mongoose";

const stackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true

    }
})

const Stack = mongoose.model("Stack", stackSchema, 'stacks');
export default Stack;