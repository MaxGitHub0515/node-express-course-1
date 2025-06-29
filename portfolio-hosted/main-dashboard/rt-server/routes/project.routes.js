import express from "express";

import Project from "../models/project.model.js";
import cuid from "cuid";
import { createProject, getSingleProject } from "../controllers/project.controller.js";

const router = express.Router();

// Create project
router.post("/", createProject);

// Get project by cuid
router.get("/:id",getSingleProject) 


export default router;
