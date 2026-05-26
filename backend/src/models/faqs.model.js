import mongoose from "mongoose"

const faqSchema = new mongoose.Schema({
  customBotId: {
    type: String,
    required: true
  },
  businessId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
},
{ timestamps: true })



const faqModel =  mongoose.model("Faq", faqSchema);

export default faqModel