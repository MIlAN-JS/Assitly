import mongoose from "mongoose";
import faqModel from "../models/faqs.model.js";



const createFaqController = async(req , res ,next)=>{
    
    try {
        const customBotId = req.params.botId
        const faqs= req.body.faqs
        const businessId = req.user

       const savedFaqs = await faqModel.insertMany(
        faqs.map(({answer,question})=>({
            customBotId,
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