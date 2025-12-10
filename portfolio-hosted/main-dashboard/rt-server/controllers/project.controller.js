
import Project from '../models/project.model.js';
import {StatusCodes} from 'http-status-codes';
import { validationResult } from 'express-validator';
import NotFoundError from '../errors/not-found.js';
import { asyncWrapper } from '../middleware/async-wrapper.js';
import {uploadToCloudinary} from '../utils/project/cloudinary-upload.js';

export const createProject = asyncWrapper (async (req, res) => {
  const { name, description, imageUrl } = req.body;
  let finalImageUrl = imageUrl || "";

  if (req.files && req.files.fileUpload) {
    finalImageUrl = await uploadToCloudinary(req.files.fileUpload);
  }
   if (!finalImageUrl) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Project image is required" });
  }
  const project = await Project.create({
    name,
    description,
    image: finalImageUrl
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
      // slug: project.slug,
      description: project.description,
      image: project.image
    });

});

export const getAllProjects = asyncWrapper (async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    // mongodb document skipping
    const skip = (page -1) * limit;
    const [projects, totalCount] = await Promise.all([
      Project.find({}).skip(skip).limit(limit).sort({createdAt: -1}),
      Project.countDocuments()
    ]);
   if (projects.length === 0) {
    return res.status(StatusCodes.OK).json({
      currentPage: page,
      totalPages: 1,
      totalCount: 0,
      projects: []
    });
    }

    const totalPages = Math.ceil(totalCount / limit);
      res.status(StatusCodes.OK).json({
      currentPage: page,
      totalPages,
      totalCount,
      projects
    });
    
});

export const deleteProject = asyncWrapper ( async (req, res) => {
    const {id: projectId} = req.params;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) throw new NotFoundError('Project not found');
    res.status(StatusCodes.OK).json({message: 'Project deleted successfully'});
});

export const updateProject = asyncWrapper ( async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const {id: projectId} = req.params;
  // removed and added as a middleware to route 
  // .....
  const errors = validationResult(req);
  if(!errors.isEmpty() ) {
    return  res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation failed:", errors: errors.array() });
  }
  let finalImageUrl = imageUrl || "";
  if (req.files?.fileUpload) {
    finalImageUrl = await uploadToCloudinary(req.files.fileUpload);
  }
  const project = await Project.findByIdAndUpdate(projectId,
    { name, description, image: finalImageUrl },
    { new: true, runValidators: true }
    );
    if(!project) {
      throw new NotFoundError('Project not found');
    }
    res.status(StatusCodes.OK).json({
      _id: project._id,
      name: project.name,
      // slug: project.slug,
      description: project.description,
      image: project.image
    });
      
});

