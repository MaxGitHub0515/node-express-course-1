
import express from "express";
import {
    aggregateUser,
    createVisitor

} from "../controllers/visitor.controller.js"
const router = express.Router();


router.get("/monthly", aggregateUser )
router.post('/', createVisitor)


export default router;
