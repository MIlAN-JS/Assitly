
import {createBotService} from "../services/bot.service.js"
import uploadImageService from "../services/uploadFile.service.js"

const createBotController = async (req, res , next) => {
  try {
    const businessId = req.user  // from checkUser middleware
    const { systemPrompt } = req.body
    const widgetSettings = JSON.parse(req.body.widgetSettings)

    const avatarImage = req.file

    const avatarUrl = await uploadImageService(avatarImage)
    widgetSettings.botAvatar = avatarUrl

    const newBot = await createBotService({ businessId, systemPrompt, widgetSettings })


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

      const botId = req.params.botId

      const bot = await botModel.findById(botId)

      res.status(200).json({
        message : "bot fetched successfully",
        success : true,
        bot
      })
      
    } catch (error) {
      
    }
  }



  export {
    createBotController, 
    getBotController
  }
