
import jwt from "jsonwebtoken"
import config from "../config/env.config.js"
import rateLimit from "express-rate-limit"

// const checkUser = (req ,res, next)=>{
//     try {

//        const accessToken = req.headers.authorization?.split(" ")[1];

//         console.log(accessToken)
//     if(!accessToken){
//         const err = new Error("Not authorized")
//         err.statusCode = 401
//         throw err
//     }

//     const decoded = jwt.verify(accessToken , config.JWT_SECRET)
//     req.user = decoded.id
//     next()
        
//     } catch (error) {

//         console.log(error)
//         next(error)
        
//     }
// } --> writeen by me 


const checkUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const accessToken = authHeader?.split(" ")[1];
console.log(accessToken)
    if (!accessToken) {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }

    const decoded = jwt.verify(accessToken, config.JWT_SECRET);

    req.user = decoded.id;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
// updated by my ai bro
export default checkUser;


const  authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests
  message: { message: 'Too many attempts, please try again later' }
})



export  {
    checkUser,
    authLimiter
}