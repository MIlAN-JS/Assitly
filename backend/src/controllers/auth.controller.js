import userModel from "../models/user.model.js"
import { registerUserService } from "../services/auth.service.js"
import { sendEmail } from "../services/email.service.js"
import { createAccessToken, createRefreshToken } from "../utils/generateToken.util.js"
import { findOrCreateUser } from "../services/auth.service.js"
import jwt from "jsonwebtoken"
import config from "../config/env.config.js"
import bcrypt from "bcryptjs"


const registerUserController = async(req , res ,next)=>{
    try {

        const {businessName , email , password} = req.body
          
        const response = await registerUserService({email , password ,businessName})
 

        // const accessToken= createAccessToken(response._id)
        // const refreshToken = createRefreshToken(response._id)

        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: false, // Set to true in production (requires HTTPS)
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // })

        const emailResponse = await sendEmail({
            to : email, 
            userId : response._id
        })
        
        res.status(200).json({
            message : "user registered successfully",
            success : true
          //   user : {
          //      id :  response._id,
          //   email : response.email, 
          //   businessName : response.businessName, 
          // avatar : response.avatar
          //   }, 
          //   emailResponse : emailResponse, 
            
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
  
  return res.redirect("http://localhost:5174/"); // changed from login to your route
    
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

   

    if (!user || !user.isVerified ) {
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
       res.status(200).json({
            message : "user created successfully",
            user : {
               id :  user._id,
            email : user.email, 
            businessName : user.businessName, 
            accessToken : newAccessToken,
             avatar : user.avatar
            }, 
           
        })

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
  
  return res.redirect("http://localhost:5174/"); // changed from login to your route
    
  } catch (error) {

    console.log(error)
    next(error)
    
  }
};

const logoutController = async(req , res ,next)=>{
    try {

     
        
        const userId = req.user

        // check if user exist 
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).json({
                message : "Cannot find user", 
                success : false
            })
        }

        // fetch the token 

        const refreshToken = req.cookies.refreshToken

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });


        res.status(200).json({
            message : "logout success", 
            success : true
        })
        


    } catch (error) {
         console.log(error , "logout error ")
        next(error)
       
        
    }
}

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // check if user exists
    const user = await userModel.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    // check if user registered with google/github
    if (!user.password) return res.status(401).json({ message: 'Please login with Google or Github' })

    // check if email is verified
    if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' })

    // check password
    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    // generate tokens
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ 
      accessToken,
      message: 'Login successful',
      success: true,
       user: {
      id: user._id,
      businessName: user.businessName,
      email: user.email,
      avatar: user.avatar,
      isVerified: user.isVerified

    }})

  

  } catch (error) {
    next(error)
  }
}

const getCurrentUserController = async (req, res, next) => {
  try {
    const userId= req.user;
    console.log(userId)
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await userModel.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    // check if google/github user
    if (!user.password) return res.status(400).json({ message: 'Please login with Google or Github' })

    await sendEmail({ to: email, userId: user._id, emailType: 'forgotPassword' })

    res.json({ message: 'Password reset email sent' })

  } catch (error) {
    console.log("error while forgoting pass", error)
    next(error)
  }
}

// POST /api/auth/reset-password
const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body

    const user = await userModel.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }
    })

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' })

    user.password =password
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined
    await user.save()

    res.json({ message: 'Password reset successful' })

  } catch (error) {
    console.log("error while resetting password")
    next(error)
  }
}


export {
    registerUserController, 
    verifyEmailController,
    googleCallbackController,
    getAccessTokenController,
    githubCallbackController,
    logoutController,
    loginUserController, 
    getCurrentUserController, 
    forgotPasswordController, 
    resetPasswordController
}