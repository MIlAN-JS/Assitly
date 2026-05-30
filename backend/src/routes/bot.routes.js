// routes/bot.routes.js
import { Router } from "express"
import { checkUser } from "../middlewares/auth.middleware.js"
import { createBotController, getBotController, updateBotSettingsController } from "../controllers/bot.controller.js"
import multer from "multer"
const botRouter = Router()

const upload = multer({
 storage : multer.memoryStorage(), 
 limits: {
    fileSize: 5 * 1024 * 1024
  }
});



/**
 * @route /api/bot/create-bot
 * @description it is used to create a new bot huhu 
 * @access private 
 */

botRouter.post("/create-bot",upload.single("image") ,checkUser, createBotController )
botRouter.get("/get-bot/widget/:botId", getBotController )
botRouter.get("/get-bot",checkUser, getBotController )

botRouter.patch("/update-bot" , checkUser ,updateBotSettingsController)

export default botRouter