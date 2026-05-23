import {Router} from "express"
import { registerUserController, verifyEmailController } from "../controllers/auth.controller.js"
import { validateRegisterUser } from "../validators/auth.validator.js"
const authRouter = Router()
import userModel from "../models/user.model.js"
/**
 * @route post /api/auth/register
 * @description Register a new user 
 * @access public
 */
authRouter.post("/register" ,validateRegisterUser , registerUserController)

/**
 * @route post /api/auth/verify-email
 * @description verify email address of a user
 * @access registered users
 */

authRouter.post('/verify-email',verifyEmailController);


export default authRouter
