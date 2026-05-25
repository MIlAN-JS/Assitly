// routes/bot.routes.js
import { Router } from "express"
import { checkUser } from "../middlewares/auth.middleware.js"
import { createBotController } from "../controllers/bot.controller.js"
import multer from "multer"
const botRouter = Router()

const upload = multer({
 storage : multer.memoryStorage(), 
 limits: {
    fileSize: 5 * 1024 * 1024
  }
});


// all bot routes are protected
botRouter.use(checkUser)  // ← applies checkUser to all routes below

/**
 * @route /api/bot/create-bot
 * @description it is used to create a new bot huhu 
 * @access private 
 */

botRouter.post("/create-bot",upload.single("image") , createBotController )




export default botRouter