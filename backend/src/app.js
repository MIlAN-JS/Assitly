import express from 'express'
import cookieParser from "cookie-parser"

import authRouter from './routes/auth.routes.js'
import errHandler from './middlewares/errorHandler.middleware.js'

const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))


/**
 * @description Routes
 */
 app.use("/api/auth" , authRouter)

// google strategy

// app.use(passport.initialize());


// error handler
app.use(errHandler)

export default app