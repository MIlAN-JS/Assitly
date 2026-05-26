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
    console.log("start to send msg to ai ")
  const response = await groqModel.invoke(message)
  console.log("completed")
  return response.content

}





export {
    chatWithAi
}


