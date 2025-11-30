
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
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


router.post("/", protectRoute, validateProject, validateRequest, createProject);

router.get("/:id",getSingleProject) 

router.patch("/:id", protectRoute, validateProjectUpdate, validateRequest, updateProject)

router.delete("/:id", protectRoute, deleteProject)

router.get("/", getAllProjects)



export default router;

