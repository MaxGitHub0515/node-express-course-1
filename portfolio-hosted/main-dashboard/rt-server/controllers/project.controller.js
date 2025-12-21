
import Project from '../models/project/project.model.js';
import {StatusCodes} from 'http-status-codes';
import { validationResult } from 'express-validator';
import NotFoundError from '../errors/not-found.js';
import { asyncWrapper } from '../middleware/async-wrapper.js';
import {uploadToCloudinary} from '../utils/project/cloudinary-upload.js';
import Stack from "../models/project/stack.model.js"

export const getAllStacks = asyncWrapper(async (req, res) => {
  // sort them a-z 
  const stacks = await Stack.find({}).sort({name: 1});
  res.status(StatusCodes.OK).json(stacks)
})

export const createProject = asyncWrapper (async (req, res) => {
  const { name, description, imageUrl, stack, projectLocUrl } = req.body;
  let finalImageUrl = imageUrl || "";

  if (req.files && req.files.fileUpload) {
    finalImageUrl = await uploadToCloudinary(req.files.fileUpload);
  }
   if (!finalImageUrl) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Project image is required" });
  }
  let stackIds = [];
  if(stack) {
  
    const stackNames = Array.isArray(stack) ? stack : stack.split(",");
    // Process each stack name: Find it or Create it (Upsert)
    const stackPromises = stackNames.map(async (name) => {
      // Skip empty strings
      if (!name.trim()) return null;
      const trimmedName = name.trim();
      const doc = await Stack.findOneAndUpdate(
        { name: trimmedName },             // Search criteria
        { name: trimmedName },             // What to update/create
        { upsert: true, new: true }         // Create if not found, return the doc
      );
      return doc._id;
    });

    // Filter out nulls if any empty strings existed
    const results = await Promise.all(stackPromises);
    stackIds = results.filter(id => id !== null);

  }
  const project = await Project.create({
    name,
    description,
    image: finalImageUrl,
    stack: stackIds,
    projectLocUrl: projectLocUrl || ""
  });
    res.status(StatusCodes.CREATED).json({
      _id: project._id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      image: project.image,
      stack: stackIds,
      projectLocUrl: projectLocUrl || ""

    });  
});

export const getSingleProject = asyncWrapper (async (req, res) => {
    // req.params.id; id - name taken from router.get("/:id",getSingleProject)
    const {id: projectId} = req.params;
    const project = await Project.findById(projectId).populate('stack', 'name');
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
  const { search, stack, page } = req.query;
  const queryObject = {};
  // SEARCH FILTER
    if (search) {
        queryObject.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }
    // STACK FILTER
    // Logic: If stack is "All" (or empty), we skip this block -> MongoDB returns everything.
    if (stack && stack !== 'All' && stack !== '') {
        const stackList = stack.split(',');

        // Find Stack IDs matching the names
        const matchingStacks = await Stack.find({ 
            name: { $in: stackList.map(s => new RegExp(`^${s.trim()}$`, 'i')) } 
        });

        const stackIds = matchingStacks.map(s => s._id);

        if (stackIds.length > 0) {
            // Filter projects that have AT LEAST ONE of these stacks
            queryObject.stack = { $in: stackIds };
        } else {
            // User searched for a stack that doesn't exist -> Return empty list
            return res.status(StatusCodes.OK).json({ 
                currentPage: 1, totalPages: 0, totalCount: 0, projects: [] 
            });
        }
    }
    // PAGINATION
    const pageNum = Number(page) || 1;
    const limit = 3;
    // mongodb document skipping
    const skip = (pageNum - 1) * limit;
    const [projects, totalCount] = await Promise.all([
      Project.find(queryObject).skip(skip).limit(limit).sort({createdAt: -1}).populate('stack', 'name'),
      Project.countDocuments(queryObject)
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
      currentPage: pageNum,
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

