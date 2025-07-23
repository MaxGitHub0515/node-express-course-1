import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: false,
    trim: true,
  }, 

  cuid: {
    type: String,
    required: true,
    unique: true,
  },
  name:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
}, {timestamps:true} );

const Project = mongoose.model("Project", projectSchema, 'projects');
export default Project;
