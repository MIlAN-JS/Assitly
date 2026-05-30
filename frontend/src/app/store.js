// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/context/auth.slice.js"
import botReducer from "../features/bot/context/bot.slice.js"
import faqReducer from "../features/faq/context/faq.slice.js"
import pdfReducer from "../features/faq/context/pdf.slice.js"
import dashReducer from "../features/dashboard/context/dashboard.slice.js"
 const store = configureStore({
  reducer: {
    auth: authReducer, 
    bot : botReducer, 
    faq : faqReducer, 
    pdf : pdfReducer, 
    dash: dashReducer
  },
});

export default store