// models/user.model.js
// This model belongs to user / businesses who registers on our website

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
  type: String,
},
googleId: {
  type: String,
  unique: true,
  sparse: true // ✅ important
},
githubId: {
  type: String,
  unique: true,
  sparse: true // ✅ important
},
avatar : {
type : String,
default : "https://imgs.search.brave.com/wJgxev260NPCUKLhqOw1Xv_yce1xbpNxYNEJu2vCkOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2LzE0/LzFkLzY2MTQxZGFl/NWI2Yjk3Nzc0ODQz/MTY0ZjRmMGFhMmUw/LmpwZw"
},
isVerified : {
type : Boolean,
default : false
}, 
provider : {
type : String,
enum : ["local", "google", "github"],
default : "local"
},
plan: { type: String, enum: ['free'], default: 'free' },
verifyToken : String,
verifyTokenExpiry : Date, 
forgotPasswordToken : String,
forgotPasswordTokenExpiry : Date

}, { timestamps: true })


// ✅ hooks BEFORE model creation
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const userModel = mongoose.model("User", userSchema)

export default userModel