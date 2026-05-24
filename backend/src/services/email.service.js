import {Resend} from "resend"
import crypto from "crypto"
import userModel from "../models/user.model.js"
import config from "../config/env.config.js"
const resend = new Resend (config.RESEND_API_KEY)



 const sendEmail = async({ to , userId , emailType="verifyEmail"})=>{




try {
    const token =  crypto.randomBytes(32).toString("hex")
    if(emailType === "verifyEmail") {
      await userModel.findByIdAndUpdate(userId , {
    verifyToken : token,
    verifyTokenExpiry : Date.now() + 24*60*60*1000
   })

    }else if(emailType === "forgotPassword") {
      await userModel.findByIdAndUpdate(userId , {
        forgotPasswordToken : token,
        forgotPasswordTokenExpiry : Date.now() + 60*60*1000
       })
    }
   
   const url = emailType === "verifyEmail"
  ? `http://localhost:5173/verify-email?token=${token}`
  : `http://localhost:5173/reset-password?token=${token}`
  const subject = emailType === "verifyEmail" ? "Verify your email for Assistly!!" : "Reset your Assistly password"

    const html = emailType === "verifyEmail" ? `
  <div style="background:#F4EFE8;padding:2rem;font-family:sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;border:1px solid #e0d9d0;overflow:hidden;">
      <div style="background:#F4EFE8;padding:2rem;text-align:center;">
        <p style="margin:0;font-size:22px;font-weight:500;color:#1A3A2A;">Assistly</p>
      </div>
      <div style="padding:2rem 2.5rem;">
        <p style="font-size:20px;font-weight:500;margin:0 0 0.75rem;color:#1a1a1a;">Verify your email address</p>
        <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 1.75rem;">Hi there! Thanks for signing up for Assistly. Please verify your email address to activate your account.</p>
        <div style="text-align:center;margin:0 0 1.75rem;">
          <a href="${url}" style="display:inline-block;background:#1A3A2A;color:#fff;text-decoration:none;padding:0.75rem 2rem;border-radius:6px;font-size:15px;font-weight:500;">Verify my email</a>
        </div>
        <p style="font-size:13px;color:#888;margin:0 0 0.5rem;">Or copy and paste this link:</p>
        <p style="font-size:12px;color:#1A3A2A;word-break:break-all;padding:0.75rem;background:#F4EFE8;border-radius:6px;margin:0 0 1.75rem;">${url}</p>
        <p style="font-size:13px;color:#888;line-height:1.7;margin:0;">This link expires in <strong style="color:#1a1a1a;">24 hours</strong>. If you didn't create an account, you can safely ignore this email.</p>
      </div>
      <div style="border-top:1px solid #e0d9d0;padding:1.25rem 2.5rem;text-align:center;background:#F4EFE8;">
        <p style="font-size:12px;color:#888;margin:0;">© 2026 Assistly · All rights reserved</p>
      </div>
    </div>
  </div>
` : `
  <div style="background:#F4EFE8;padding:2rem;font-family:sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;border:1px solid #e0d9d0;overflow:hidden;">
      <div style="background:#F4EFE8;padding:2rem;text-align:center;">
        <p style="margin:0;font-size:22px;font-weight:500;color:#1A3A2A;">Assistly</p>
      </div>
      <div style="padding:2rem 2.5rem;">
        <p style="font-size:20px;font-weight:500;margin:0 0 0.75rem;color:#1a1a1a;">Reset your password</p>
        <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 1.75rem;">We received a request to reset your Assistly password. Click the button below to choose a new one.</p>
        <div style="text-align:center;margin:0 0 1.75rem;">
          <a href="${url}" style="display:inline-block;background:#1A3A2A;color:#fff;text-decoration:none;padding:0.75rem 2rem;border-radius:6px;font-size:15px;font-weight:500;">Reset my password</a>
        </div>
        <p style="font-size:13px;color:#888;margin:0 0 0.5rem;">Or copy and paste this link:</p>
        <p style="font-size:12px;color:#1A3A2A;word-break:break-all;padding:0.75rem;background:#F4EFE8;border-radius:6px;margin:0 0 1.75rem;">${url}</p>
        <p style="font-size:13px;color:#888;line-height:1.7;margin:0;">This link expires in <strong style="color:#1a1a1a;">1 hour</strong>. If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
      <div style="border-top:1px solid #e0d9d0;padding:1.25rem 2.5rem;text-align:center;background:#F4EFE8;">
        <p style="font-size:12px;color:#888;margin:0;">© 2026 Assistly · All rights reserved</p>
      </div>
    </div>
  </div>
`

    const {data, error} = await resend.emails.send({
  from: 'onboarding@resend.dev',  // use this free test address
   to: to,       // only own email works with the free test address
  subject: subject,
 html : html
    })

    return { data, error }
    
} catch (error) {
      console.error('Email send failed:', error)
    throw new Error(error.message)
}
}


export { 
    sendEmail
}

