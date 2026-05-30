import express from 'express'
import cookieParser from "cookie-parser"
import passport from 'passport'
import authRouter from './routes/auth.routes.js'
import errHandler from './middlewares/errorHandler.middleware.js'
import botRouter from './routes/bot.routes.js'
import faqRouter from './routes/faq.routes.js'
import pdfRouter from './routes/pdf.routes.js'
import conversationRouter from './routes/conversation.route.js'
import cors from "cors"
import dashboardRouter from './routes/dashboard.routes.js'



const app = express()




// setting up multer


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))
app.use(cors({
  origin: "*"
}));
// google strategy

app.use(passport.initialize());



/**
 * @description Routes
 */
 app.use("/api/auth" , authRouter)
 app.use("/api/bot",   botRouter)
app.use("/api/faq", faqRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/bot", conversationRouter)
app.use("/api/dashboard", dashboardRouter)
/
// error handler
app.use(errHandler)

export default app