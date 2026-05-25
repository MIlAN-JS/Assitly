import mongoose, { mongo } from "mongoose";
import crypto from "crypto"

const botSchema = new mongoose.Schema({

    businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  systemPrompt: {
    type: String,
    required: true, 
    default : "act as a customer support for a business."
  },
 customBotId: {
    type: String,
    unique: true,
    default: () => "bot_"+crypto.randomBytes(8).toString("hex") ,
  },

widgetSettings: {
  // appearance
  primaryColor: {
    type: String,
    default: "#6366f1"
  },
  textColor: {
    type: String,
    default: "#ffffff"
  },
  position: {
    type: String,
    enum: ["bottom-right", "bottom-left"],
    default: "bottom-right"
  },
  borderRadius: {
    type: String,
    default: "12px"
  },

  // bot identity
  botName: {
    type: String,
    default: "Support Bot"
  },
  botAvatar: {
    type: String,
    default: null
  },
  welcomeMessage: {
    type: String,
    default: "Hi! How can I help you today?"
  },

  // input
  placeholder: {
    type: String,
    default: "Type a message..."
  },

  // behaviour
  autoOpen: {
    type: Boolean,
    default: false // 
  },
  showBranding: {
    type: Boolean,
    default: true       // false = paid plan only
  }
},
}, {timestamps:true})



const botModel = mongoose.model(
    "bot" , botSchema
)


export default botModel