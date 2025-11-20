
import express from "express";
import validateRequest from "../middleware/validate-request.js";
import { validateProject, validateProjectUpdate } from "../utils/validators/project-validator.js";
const router = express.Router();

import { 
    createProject, 
    getSingleProject,
    updateProject,
    getAllProjects,
    deleteProject

 } from "../controllers/project.controller.js";


router.post("/", validateProject, validateRequest, createProject);

router.get("/:id",getSingleProject) 

router.patch("/:id", validateProjectUpdate, validateRequest, updateProject)

router.delete("/:id", deleteProject)

router.get("/", getAllProjects)



export default router;

