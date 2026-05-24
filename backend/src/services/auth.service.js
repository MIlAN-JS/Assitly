import userModel from "../models/user.model.js"
import crypto from "crypto"
import { sendEmail } from "./email.service.js"

const registerUserService = async({email, password, businessName})=>{

const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    throw new Error("Email already registered")
    return
  }

  // create new business
  const user = await userModel.create({ email, password , businessName })

  return {
    _id: user._id,
    email: user.email,
    businessName: user.businessName,
    avatar : user.avatar
  }



}

const findOrCreateUser = async (userData, provider) => {
  const { id, displayName, name, emails, photos } = userData;

  console.log(provider)
 
  const email = emails?.[0]?.value;
  const businessName = name
    ? `${name.givenName || ''} ${name.familyName || ''}`.trim()
    : displayName;

 
  const query = [
    { googleId: id },
    { githubId: id },
  ]

  if (email) query.push({ email })

  const user = await userModel.findOne({ $or: query })
  if (user) return user

  // create new user
  const newUser = await userModel.create({
    businessName: businessName,
    avatar: photos?.[0]?.value,
    ...(email && { email }),
    ...(provider === 'google' && { googleId: id , provider : 'google' }), // haha it works like when provider is google then only googleId field will be added to the user document and when provider is github then only githubId field will be added to the user document because ...true will add the object here and ...false will not add the object here
    ...(provider === 'github' && { githubId: id , provider : 'github' }),
  })

  return newUser
}



export {
    registerUserService,
    findOrCreateUser
}