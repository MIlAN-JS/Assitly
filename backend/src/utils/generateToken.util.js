import jwt from "jsonwebtoken"
import config from "../config/env.config.js"


function createAccessToken(userId){
    const accessToken = jwt.sign({
        id : userId
} ,config.JWT_SECRET , {expiresIn : "15m"})
    return accessToken;
}


function createRefreshToken(userId){
    const refreshToken = jwt.sign({
        id : userId
} ,config.JWT_SECRET , {expiresIn : "7d"})
    return refreshToken;
}

export {
    createAccessToken,
    createRefreshToken
}