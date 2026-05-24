
import jwt from "jsonwebtoken"
import config from "../config/env.config.js"

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



export  {
    checkUser
}