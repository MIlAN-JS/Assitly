import mongoose from "mongoose";


const mongoose = require('mongoose')

const pdfSchema = new mongoose.Schema({
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

  // file info
  title: {
    type: String,
    required: true       // original filename
  },
  fileSize: {
    type: Number,        // in bytes
  },

  // pinecone references
  pineconeIds: {
    type: [String],      // array of chunk vector IDs
    default: []
  },
  totalChunks: {
    type: Number,        // how many chunks were created
    default: 0
  },

  // status
  status: {
    type: String,
    enum: ["processing", "ready", "failed"],
    default: "processing"  // processing until pinecone is done
  },

}, { timestamps: true })

const pdfModel = mongoose.model('PDF', pdfSchema)

export default pdfModel
