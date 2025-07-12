
import express from "express";
import Visitor from "../models/visitor.model.js";
import {
    aggregateUser

} from "../controllers/visitor.controller.js"
const router = express.Router();


router.get("/monthly", aggregateUser )


export default router;
