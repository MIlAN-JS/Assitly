import {Router} from "express"
import { registerUserController } from "../controllers/auth.controller.js"
import { validateRegisterUser } from "../validators/auth.validator.js"
const authRouter = Router()

/**
 * @route post /api/register
 * @description Register a new user 
 * @access public
 */
authRouter.post("/register" ,validateRegisterUser , registerUserController)



export default authRouter
