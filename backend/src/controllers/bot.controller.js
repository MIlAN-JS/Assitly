
import { set } from "mongoose"
import botModel from "../models/bot.model.js"
import {createBotService} from "../services/bot.service.js"
import uploadImageService from "../services/uploadFile.service.js"
import conversationModel from "../models/conversation.model.js"

const createBotController = async (req, res , next) => {
  try {
    const businessId = req.user  // from checkUser middleware
    const { systemPrompt } = req.body
    const widgetSettings = JSON.parse(req.body.widgetSettings)

    console.log(businessId , systemPrompt , widgetSettings)
    const avatarImage = req.file

    const avatarUrl = await uploadImageService(avatarImage)
    widgetSettings.botAvatar = avatarUrl

    const newBot = await createBotService({ businessId, systemPrompt, widgetSettings })

    console.log(newBot)

    res.status(201).json({
        message : "bot created successfully",
      success: true,
      bot: newBot
       })

  } 
  catch (error) {
        next(error)
    }
  }

  const getBotController = async(req , res, next)=>{
    try {
console.log("inside get bot")
      const businessId = req.user
      const botId = req.params.botId
      console.log(businessId)


      const bot = await botModel.findOne({
        $or: [
          { customBotId: botId },
          { businessId: businessId }
        ]
      }) 

      console.log(bot)

      if(!bot){
        return res.status(404).json({
          message : "bot not found",
          success : false
        })
      }

      res.status(200).json({
        message : "bot fetched successfully",
        success : true,
        bot
      })
      
    } catch (error) {

       next(error)
      
    }
  }

  const updateBotSettingsController = async(req , res, next)=>{
    try {

      const businessId = req.user
      const settings = JSON.parse(req.body.settings)
      const file  = req.file

      console.log( settings , file)

      const bot = await botModel.findOne({ businessId })
      if(!bot){
        return res.status(404).json({
          message : "bot not found",
          success : false
        })
      }
      
      console.log(settings)

      let widgetSettings = bot.widgetSettings

      if(file){
        const avatarUrl = await uploadImageService(file)
        settings.botAvatar = avatarUrl
      }
      

      const newWidgetSettings = {
          primaryColor : settings?.primaryColor || widgetSettings.primaryColor,
          botAvatar : settings?.botAvatar || widgetSettings.botAvatar,
          botName : settings?.botName || widgetSettings.botName,
          position : settings?.position || widgetSettings.position,
          borderRadius : settings?.borderRadius || widgetSettings.borderRadius,
          textColor : settings?.textColor || widgetSettings.textColor ,
          welcomeMessage : settings?.welcomeMessage || widgetSettings.welcomeMessage,
          placeholder : settings?.placeholder || widgetSettings.placeholder, 
          systemPrompt : settings?.systemPrompt || widgetSettings.systemPrompt
      }

    const updatedBot = await botModel.findOneAndUpdate(
  { businessId },
  { $set: { widgetSettings: newWidgetSettings } },
  {returnDocument: "after" }
);
      


      res.status(200).json({
        message : "bot settings updated successfully",
        success : true,
        widgetSettings : updatedBot.widgetSettings
      })
      
      
    } catch (error) {

      console.log(error)
      next(error)
      
    }
  }



  export {
    createBotController, 
    getBotController, 
    updateBotSettingsController
  }
