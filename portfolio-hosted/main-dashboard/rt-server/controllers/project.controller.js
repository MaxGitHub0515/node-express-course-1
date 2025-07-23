
import Project from '../models/project.model.js';
import Cuid from 'cuid';
const  createProject = async (req, res) => {
  const { projectId, cuid, name, description, imageUrl,  } = req.body;

  const newProject = new Project({
    projectId,
    cuid: Cuid(),
    name,
    description,
    imageUrl,
  });
  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const getSingleProject = async (req, res) => {
   try {
    // req.params.id; id - name taken from router.get("/:id",getSingleProject) 
    const project = await Project.findOne({ _id: req.params.id });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

export { createProject, getSingleProject };