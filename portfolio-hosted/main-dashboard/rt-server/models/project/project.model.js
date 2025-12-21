import mongoose from "mongoose";
import slugify from 'slugify';

const projectSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Project name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 30 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    minlength: [20, 'Description must be at least 60 characters long'],
    maxlength: [1500, 'Description cannot exceed 1500 characters'],
    trim: true,
  },
  image: {
    type: String,
    // required: [true, 'Project image is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  stack: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stack'
  }],
  // features: [{
  //   type: String,
  //   required: true,
  //   trim: true,
  // }],

}, {timestamps:true} );
// used for urls on the ui
projectSchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model("Project", projectSchema, 'projects');
export default Project;

