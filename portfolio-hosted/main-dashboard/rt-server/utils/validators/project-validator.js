
import {body} from "express-validator";

export const validateProject = [
    body("name")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project name is required")
        .isString()
        .withMessage("Validation: Project name must be a string")
        .trim(),
    body("description")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project description is required")
        .isString()
        .withMessage("Validation: Project description must be a string"),
    body("imageUrl")
        .optional()
        .isString()
        .withMessage("Validation: Project image must be a string"),
    body("fileUpload") 
        .optional()
        
]

export const validateProjectUpdate = [
    body("name")
        .optional()
        .isString()
        .withMessage("Project name must be a string")
        .trim(),

    body("description")
        .optional()
        .isString()
        .withMessage("Project description must be a string")
        .trim(),
    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image must be a valid URL"),
    body("fileUpload") 
        .optional()
];