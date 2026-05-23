import { body, validationResult } from "express-validator";


function validateRequest(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();

}


export const validateRegisterUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
   
    body("password")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("businessName")
        .notEmpty().withMessage("Business name is required")
        .isLength({ min: 3 }).withMessage("Business name must be at least 3 characters long"),,
    validateRequest
]




