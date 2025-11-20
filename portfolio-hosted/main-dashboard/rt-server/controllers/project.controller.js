
import Project from '../models/project.model.js';
import {StatusCodes} from 'http-status-codes';
import { validationResult } from 'express-validator';
import NotFoundError from '../errors/not-found.js';
import { asyncWrapper } from '../middleware/async-wrapper.js';

export const createProject = asyncWrapper (async (req, res) => {
  const { name, description, image } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty() ) {
    return  res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation failed:", errors: errors.array() });
  }
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
});

export const getSingleProject = asyncWrapper (async (req, res) => {
    // req.params.id; id - name taken from router.get("/:id",getSingleProject)
    const {id: projectId} = req.params;
    const project = await Project.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    res.status(StatusCodes.OK).json({
      _id: project._id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      image: project.image
    });

});

export const getAllProjects = asyncWrapper (async (req, res) => {
    const projects = await Project.find({});
    if (projects.length === 0) throw new NotFoundError('No projects found');
    res.status(StatusCodes.OK).json(projects);
});

export const deleteProject = asyncWrapper ( async (req, res) => {
    const {id: projectId} = req.params;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) throw new NotFoundError('Project not found');
    res.status(StatusCodes.OK).json({message: 'Project deleted successfully'});
});

export const updateProject = asyncWrapper ( async (req, res) => {
  const { name, description, image } = req.body;
  const {id: projectId} = req.params;
  const errors = validationResult(req);
  if(!errors.isEmpty() ) {
    return  res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation failed:", errors: errors.array() });
  }
  const project = await Project.findByIdAndUpdate(projectId,
    { name, description, image },
    { new: true, runValidators: true }
    );
    if(!project) {
      throw new NotFoundError('Project not found');
    }
    res.status(StatusCodes.OK).json({
      _id: project._id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      image: project.image
    });
      
});

