import botModel from "../models/bot.model.js"


const createBotService = async ({  businessId, systemPrompt, widgetSettings }) => {

  const bot = await botModel.create({
    businessId,
    systemPrompt,
    widgetSettings
    
  })

  return bot

}


export {
    createBotService
}