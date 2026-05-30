import  { ChatGoogleGenerativeAI }from '@langchain/google-genai'
import config from "../config/env.config.js"
import {ChatGroq} from "@langchain/groq"


const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",   // free and fast
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.7             // 0 = robotic, 1 = creative
})

const groqModel = new ChatGroq({
  model: "llama-3.3-70b-versatile",   
  apiKey: config.GROQ_API_KEY,
  temperature: 0.7             // 0 = robotic, 1 = creative
})



const chatWithAi = async (message) => {
  
    const startTime = Date.now()
  const response = await groqModel.invoke(message)

  const responseTime = Date.now() - startTime
  
  console.log(responseTime)
  return {content : response.content , responseTime : responseTime}

}





export {
    chatWithAi
}


