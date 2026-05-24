import userModel from "../models/user.model.js"
import { registerUserService } from "../services/auth.service.js"
import { sendEmail } from "../services/email.service.js"
import { createAccessToken, createRefreshToken } from "../utils/generateToken.util.js"
import { findOrCreateUser } from "../services/auth.service.js"
import jwt from "jsonwebtoken"
import config from "../config/env.config.js"


const registerUserController = async(req , res ,next)=>{
    try {

        const {businessName , email , password} = req.body
          
        const response = await registerUserService({email , password ,businessName})
 

        const accessToken= createAccessToken(response._id)
        const refreshToken = createRefreshToken(response._id)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // Set to true in production (requires HTTPS)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        const emailResponse = await sendEmail({
            to : email, 
            userId : response._id
        })
        
        res.status(200).json({
            message : "user created successfully",
            user : {
               id :  response._id,
            email : response.email, 
            businessName : response.businessName, 
            accessToken : accessToken,
            }, 
            emailResponse : emailResponse
        })


        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

const verifyEmailController =  async (req, res) => {
  const { token } = req.body;
  console.log(token)
  
  const user = await userModel.findOne({ verifyToken: token });
  console.log(user)
  
  if (!user) return res.status(400).json({ message: 'Invalid token' });
  
  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();
  
  res.json({ message: 'Email verified successfully' });
}

 const googleCallbackController = async (req, res, next) => {

  try {

    const userData = req.user;

  if (!userData) {
    return res.redirect("http://localhost:5173/login");
  }

  const user = await findOrCreateUser(userData , "google");

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);


 res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // 🔥 set true in production (HTTPS)
    sameSite: "lax",
  });

  user.isVerified = true; // since google already verifies email so we can directly mark user as verified
  await user.save();
  
  return res.redirect("http://localhost:5173/dashboard"); // changed from login to your route
    
  } catch (error) {

    console.log(error)
    next(error)
    
  }
};

const getAccessTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' })

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)


    const user = await userModel.findById(decoded.id)

   

    if (!user && !user.isVerified ) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const newAccessToken = createAccessToken(user._id)

    const newRefreshToken = createRefreshToken(user._id)

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (requires HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // send access token in response body, not cookie
    res.json({ accessToken: newAccessToken })

  } catch (error) {
    next(error)
  }
}
 const githubCallbackController = async (req, res, next) => {

  try {

    const userData = req.user;

  if (!userData) {
    return res.redirect("http://localhost:5173/login");
  }



  const user = await findOrCreateUser(userData , "github");
const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);


 res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // 🔥 set true in production (HTTPS)
    sameSite: "lax",
  });

  user.isVerified = true; // since google already verifies email so we can directly mark user as verified
  await user.save();
  
  return res.redirect("http://localhost:5173/dashboard"); // changed from login to your route
    
  } catch (error) {

    console.log(error)
    next(error)
    
  }
};

export {
    registerUserController, 
    verifyEmailController,
    googleCallbackController,
    getAccessTokenController,
    githubCallbackController
}