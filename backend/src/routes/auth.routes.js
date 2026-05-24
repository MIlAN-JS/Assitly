import {Router} from "express"
import { registerUserController, verifyEmailController , getAccessTokenController } from "../controllers/auth.controller.js"
import { validateRegisterUser } from "../validators/auth.validator.js"
import { googleCallbackController , githubCallbackController } from "../controllers/auth.controller.js"
import passport from "../config/passport.config.js"
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


/**
 * @route api/auth/google
 * @description google redirect route for authentication
 * @access public
 */
authRouter.get("/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] })
);

/**
 * @route api/auth/google/callback
 * @description  google callback route for authentication
 * @access  public
 */
authRouter.get('/google/callback',passport.authenticate("google",{
    session: false,
    failureRedirect: '/'
}), googleCallbackController)

/**
 * @route /api/auth/get-access-token
 * @description to get access token using refresh token
 * @access  private
 */

authRouter.get('/get-access-token', getAccessTokenController)
 * @route api/auth/github
 * @description github redirect route for authentication
 * @access public
 */

authRouter.get("/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * @route /api/auth/github/callback
 * @description github callback route for authentication
 * @access public
 */

authRouter.get('/github/callback',passport.authenticate("github",{
    session: false,
    failureRedirect: '/'
}), githubCallbackController)

export default authRouter
