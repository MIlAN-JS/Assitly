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
type : String
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