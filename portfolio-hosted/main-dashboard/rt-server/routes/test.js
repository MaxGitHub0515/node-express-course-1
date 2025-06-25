

import expess from 'express';
const app = expess();

const router = expess.Router();

import { 
    testController,


 } from '../controllers/test.js';
 
router.get("/test", testController)


export default router