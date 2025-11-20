import mongoose from "mongoose";
import slugify from 'slugify';

const projectSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Project name is required'],
    unique: true,
    trim: true,
    minlength: [6, 'Name must be at least 6 characters long'],
    maxlength: [50, 'Name cannot exceed 30 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    minlength: [60, 'Description must be at least 60 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Project image is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,

  }
}, {timestamps:true} );

projectSchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model("Project", projectSchema, 'projects');
export default Project;

