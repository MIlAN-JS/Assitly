import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
  // identity
  customBotId: {
    type: String,
    required: true
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // visitor info
  visitorId: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },

  // messages
  role: {
    type: String,
    required: true,
    enum: ["human", "ai"]
  },
  content: {
    type: String,
    required: true
  },
  // analytics
  responseTime: {
    type: Number,     // ms taken to reply
    default: 0
  },

}, { timestamps: true })

// indexes for faster queries which wil  be required for analytics and other queries
conversationSchema.index({ customBotId: 1 })
conversationSchema.index({ businessId: 1 })
conversationSchema.index({ visitorId: 1 }) // this one  for ai memory
conversationSchema.index({ conversationId: 1 })

const conversationModel = mongoose.model('Conversation', conversationSchema)


export default conversationModel;