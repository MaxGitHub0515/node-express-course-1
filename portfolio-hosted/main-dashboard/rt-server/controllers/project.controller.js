


const  createProject = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const newProject = new Project({
    id: cuid(),
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
    const project = await Project.findOne({ id: req.params.id });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}