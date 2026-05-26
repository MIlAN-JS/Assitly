import faqModel from "../models/faqs.model.js"
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"

import { queryPinecone } from "./vector.service.js"

const finalMessageForAiService = async({messages,message, customBotId, bot}) =>{

  console.log(message, bot.businessId)

   const [faqs, pdfText] = await Promise.all([
        faqModel.find({ customBotId }),
        queryPinecone({ message, businessId: bot.businessId })  
    ])

     // format faqs into readable text
    const faqText = faqs?.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")



     const systemPrompt = `
${bot.systemPrompt}

===FAQ===
${faqText}

===DOCUMENT KNOWLEDGE===
${pdfText}

===INSTRUCTIONS===
- Answer based on the above context when relevant
- If the answer is not in the context, use your general knowledge
- Stay in character as defined in your personality above
`

const formattedMessages = [
        new SystemMessage(systemPrompt),  // ✅ all 3 sources injected here
        ...messages.map((msg) =>
            msg.role === "human"
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        ),
        new HumanMessage(message)  // ✅ current user message at the end
    ]


return formattedMessages

}


export  {finalMessageForAiService}

