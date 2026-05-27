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
    required: true       
  },
  fileSize: {
    type: Number,       
  },

  
  

  

}, { timestamps: true })

const pdfModel = mongoose.model('PDF', pdfSchema)

export default pdfModel
