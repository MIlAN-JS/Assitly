
import express from "express"
import { chatController } from "../controllers/conversation.controller.js"




const conversationRouter = express.Router()



conversationRouter.post("/chat/:botId", chatController)


export default conversationRouter