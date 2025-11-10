import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Userame is required"],
        unique: true,
        trim: true
    },  
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }

}, {timestamps: true});



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt) // this. referes to every document created by new User(); -> const user = new User();
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.comparePwd = async function(password) {
    return await bcrypt.compare(password, this.password)
} 
const User = mongoose.model("User", userSchema, "users"); // should be always below pre-save 

export default User;

