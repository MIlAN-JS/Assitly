
import jwt from "jsonwebtoken"
import config from "../config/env.config.js"
import rateLimit from "express-rate-limit"

const checkUser = (req ,res, next)=>{
    try {

        const accessToken = req.body.accessToken
    if(!accessToken){
        const err = new Error("Not authorized")
        err.statusCode = 401
        throw err
    }

    const decoded = jwt.verify(accessToken , config.JWT_SECRET)
    req.user = decoded.id
    next()
        
    } catch (error) {

        console.log(error)
        next(error)
        
    }
}


const  authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests
  message: { message: 'Too many attempts, please try again later' }
})



export  {
    checkUser,
    authLimiter
}