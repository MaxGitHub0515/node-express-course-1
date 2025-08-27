
import express from "express";

const router  = express.Router();
import sendEmailContact from "../controllers/contact-em-controller.js"
router.post('/send-email', sendEmailContact);

export default router;



