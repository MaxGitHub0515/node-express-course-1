
import {body} from "express-validator";

export const validateProject = [
    body("name")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project name is required")
        .isString()
        .withMessage("Validation: Project name must be a string"),
    body("description")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project description is required")
        .isString()
        .withMessage("Validation: Project description must be a string"),
    body("image")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project image is required")
        .isString()
        .withMessage("Validation: Project image must be a string"),
        
]