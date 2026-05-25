import express from 'express'
import cookieParser from "cookie-parser"
import passport from 'passport'
import authRouter from './routes/auth.routes.js'
import errHandler from './middlewares/errorHandler.middleware.js'
import botRouter from './routes/bot.routes.js'



const app = express()

// setting up multer


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))

// google strategy

app.use(passport.initialize());



/**
 * @description Routes
 */
 app.use("/api/auth" , authRouter)
 app.use("/api/bot",   botRouter)


/
// error handler
app.use(errHandler)

export default app