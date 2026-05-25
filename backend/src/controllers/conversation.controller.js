import conversationModel from "../models/conversation.model.js";
import botModel from "../models/bot.model.js";
import { HumanMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";
import { SystemMessage } from "@langchain/core/messages";
import { chatWithAi } from "../services/langchain.service.js";
import faqModel from "../models/faqs.model.js";
import { queryPinecone } from "../services/vector.service.js";
import { finalMessageForAiService } from "../services/conversation.service.js";
import { json } from "express";


const chatController = async(req , res , next)=>{
    try {

        console.log("work started")
        const visitorId = req.body.visitorId
        const sessionId = req.body.sessionId
        const message = req.body.message
        const customBotId = req.params.botId

        console.log(message) 
        if(!message){
            return res.status(400).json({
                message : "message is required",
                success : false
            })
        }
        // check if bot exists 

        const bot = await botModel.findOne({ customBotId })
        if (!bot) {
            return res.status(404).json({
                message : "bot not found",
                success : false
            })
        }
        
      // create a new conversation

      const conversation = await conversationModel.create({
        customBotId,
        businessId: bot._id,
        visitorId,
        sessionId,
        role : "human",
        content : message 

      })

      // fetch the message from the conversation model using session Id 

      const messages = await conversationModel.find({ sessionId }).sort({ createdAt: 1 }).limit(10)

      const formatedMessage = await finalMessageForAiService({messages,message, customBotId, bot})
  

// use ai to generate a response
  const aiResponse = await chatWithAi(formatedMessage)


console.log(aiResponse)

res.status(201).json({
    message : "conversation created successfully",
    success : true,
    aiResponse
})



    


        
    } catch (error) {
        console.log(error, "cannot chat with ai ")
        
    }
}


export {
    chatController
}



