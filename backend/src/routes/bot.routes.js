// routes/bot.routes.js
import { Router } from "express"
import { checkUser } from "../middlewares/auth.middleware.js"
import { createBotController } from "../controllers/bot.controller.js"

const botRouter = Router()

// all bot routes are protected
botRouter.use(checkUser)  // ← applies checkUser to all routes below

/**
 * @route /api/bot/create-bot
 * @description it is used to create a new bot huhu 
 * @access private 
 */

botRouter.post("/create-bot", createBotController )




export default botRouter