
import mongoose from "mongoose";


const visitorSchema =  new mongoose.Schema({
    ip: String,
    userAgent: String,
    url: String,

}, 
{timestamps:true});



const Visitor = mongoose.model("Visitor", visitorSchema, 'visitors'  )


export default Visitor;