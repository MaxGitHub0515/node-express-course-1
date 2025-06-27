import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  description: String,
  imageUrl: String,
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
