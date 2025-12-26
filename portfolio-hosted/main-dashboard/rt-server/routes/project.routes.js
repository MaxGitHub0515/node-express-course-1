
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
    deleteProject,
    getAllStacks

 } from "../controllers/project.controller.js";

 
// MAIN ROUTE: /api/v1/projects
router.get("/stacks", getAllStacks )

router.get("/:id",getSingleProject) 

router.post("/", protectRoute, validateProject, validateRequest, createProject);

router.patch("/:id", protectRoute, validateProjectUpdate, validateRequest, updateProject)

router.delete("/:id", protectRoute, deleteProject)

router.get("/", getAllProjects)


export default router;

