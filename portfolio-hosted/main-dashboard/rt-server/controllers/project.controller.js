
import Project from '../models/project.model.js';
import {StatusCodes} from 'http-status-codes';
import { validationResult } from 'express-validator';


export const createProject = async (req, res) => {
  const { name, description, image } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty() ) {
    return  res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  try {
  const project = await Project.create({
    name,
    description,
    image,
  });
  
    res.status(StatusCodes.CREATED).json({
      _id: project._id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      image: project.image

    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}


export const getSingleProject = async (req, res) => {
   try {
    // req.params.id; id - name taken from router.get("/:id",getSingleProject)
    const project = await Project.findOne({ _id: req.params.projectId });
    if (!project) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found' });
    res.status(StatusCodes.OK).json({
      _jd: project._id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      image: project.image
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }

}

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    if(!projects) {
      return res.status(StatusCodes.NOT_FOUND).json({message: 'No projects found'});
    }
    res.status(StatusCodes.OK).json(projects);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);
    if(!project) {
      return res.status(StatusCodes.NOT_FOUND).json({message: 'Such project does not exist'});
    }
    res.status(StatusCodes.OK).json({message: 'Project deleted successfully'});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

export const updateProject = async (req, res) => {
  const { name, description, image } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty() ) {
    return  res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { name, description, image },
      { new: true, runValidators: true }
    );
    if(!project) {
      return res.status(StatusCodes.NOT_FOUND).json({message: 'Such project does not exist'});
    }
    res.status(StatusCodes.OK).json({
      _id: project._id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      image: project.image
    });
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
} 

