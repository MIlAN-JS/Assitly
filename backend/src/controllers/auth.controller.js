import userModel from "../models/user.model.js"
import { registerUserService } from "../services/auth.service.js"
import { createAccessToken, createRefreshToken } from "../utils/generateToken.util.js"



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

        
        res.status(200).json({
            message : "user created successfully",
            user : {
               id :  response._id,
            email : response.email, 
            businessName : response.businessName, 
            accessToken : accessToken,
            }
        })


        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

export {
    registerUserController
}