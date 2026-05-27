import mongoose from "mongoose";
import faqModel from "../models/faqs.model.js";
import botModel from "../models/bot.model.js";


const createFaqController = async(req , res ,next)=>{
    
    try {
        const faqs= req.body
        console.log(req.body)
        const businessId = req.user
    


        const bot = await botModel.findOne({ businessId })
        if (!bot) {
            return res.status(404).json({
                message : "bot not found",
                success : false
            })
        }

       const savedFaqs = await faqModel.insertMany(
        faqs.map(({answer,question})=>({
            customBotId : bot.customBotId,
            businessId,
            answer,
            question
        }))
       )

       console.log(faqs)

        res.status(201).json({
            message : "faq created successfully",
            success : true,
            faqs : savedFaqs
        })
        
    } catch (error) {
        console.log(error , "cannot store faqs")
        next (error)
    }
}


export { 
    createFaqController
}