import userModel from "../models/user.model.js"

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
  }



}

export {
    registerUserService
}