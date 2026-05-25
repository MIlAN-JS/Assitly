
import {createBotService} from "../services/bot.service.js"

const createBotController = async (req, res , next) => {
  try {
    const businessId = req.user  // from checkUser middleware
    const { systemPrompt, widgetSettings } = req.body

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



  export {
    createBotController
  }
