
import { use } from "react";
import { useSelector } from "react-redux";
import store from "../../../app/store.js";
import api from "../../../api/api.axios.js";



const getBot = async(businessId)=>{
    try {
        const bot = await api.get(`/bot/get-bot/${businessId}`)
        return bot.data
    } catch (error) {
        console.log(error.response.data.message)
       throw error?.response?.data?.message
    }
}

const createBot = async({widgetSettings, image, systemPrompt})=>{
    try {

        const formData = new FormData()
        formData.append("widgetSettings", JSON.stringify(widgetSettings))
        formData.append("image", image)
        formData.append("systemPrompt", systemPrompt)
        const response = await api.post("/bot/create-bot", formData)
        console.log(response)
        return response.data


        
        
    } catch (error) {
      console.log(error.response.data.message)
       throw error?.response?.data?.message
    }
}


export {
    getBot, 
    createBot
}