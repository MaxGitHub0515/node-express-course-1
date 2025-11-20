
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
    body("image")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project image is required")
        .isString()
        .withMessage("Validation: Project image must be a string"),
    body("slug")
        .exists({checkFalsy: true})
        .withMessage("Validation: Project slug is required")
        .isString()
        .withMessage("Validation: Project slug must be a string")
        .trim(),
        
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
    body("image")
        .optional()
        .isURL()
        .withMessage("Image must be a valid URL"),
    body("slug")
        .optional()
        .isString()
        .withMessage("Project slug must be a string")
        .trim(),
];