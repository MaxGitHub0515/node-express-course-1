
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    aggregateUser,
    createVisitor

} from "../controllers/visitor.controller.js"
const router = express.Router();


router.get("/monthly", protectRoute, aggregateUser )
router.post('/', createVisitor)


export default router;
