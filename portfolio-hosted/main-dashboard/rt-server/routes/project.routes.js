
import express from "express";

const router = express.Router();

import { 
    createProject, 
    getSingleProject,
    updateProject,
    getAllProjects,
    deleteProject

 } from "../controllers/project.controller.js";


router.post("/", createProject);

router.get("/:id",getSingleProject) 

router.patch("/:id", updateProject)

router.delete("/:id", deleteProject)

router.get("/", getAllProjects)



export default router;

