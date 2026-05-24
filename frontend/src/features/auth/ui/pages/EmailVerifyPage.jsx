import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { verifyEmail } from "../../service/auth.services";

const AssistlyLogo = () => (
  <svg width="200" viewBox="0 0 520 120" className="block">
    <rect x="0" y="10" width="100" height="100" rx="22" fill="#1a3a2a" />
    <path d="M28 72 Q50 30 72 72" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round" />
    <path d="M38 58 L62 58" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
    <circle cx="72" cy="72" r="5" fill="#ffffff" />
    <text
      x="118"
      y="58%"
      dominantBaseline="middle"
      fontFamily="Mozilla Headline, 'Times New Roman', serif"
      fontSize="100"
      fontWeight="700"
      fill="#1a3a2a"
    >
      Assistly
    </text>
  </svg>
);

export default function VerifyEmail() {
 
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [message, setMessage] = useState("");
  const [loading , setLoading] = useState(false)

  // get token from URL
  const token = new URLSearchParams(window.location.search).get("token");

  const handleVerify = async () => {
    
    setLoading(true)
   try {
    
    const response = await verifyEmail(token);
     setStatus("success")
     
    
   } catch (error) {

    setStatus("error");
    setMessage (error)
    
   }finally{
    setLoading(false)
   }

   
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#F4EFE8" }}
    >
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <AssistlyLogo />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 text-center" style={{ border: "1px solid #e0d9d0" }}>

          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#F4EFE8" }}
          >
            {status === "success" ? (
              <AiOutlineCheckCircle size={44} color="#1A3A2A" />
            ) : status === "error" ? (
              <AiOutlineCloseCircle size={44} color="#e53e3e" />
            ) : (
              <MdMarkEmailRead size={44} color="#1A3A2A" />
            )}
          </div>

          {/* Heading */}
          <h1
            className="text-3xl font-bold mb-3 tracking-tight"
            style={{ color: "#1A3A2A", fontFamily: "Mozilla Headline, 'Times New Roman', serif" }}
          >
            {status === "success"
              ? "Email verified!"
              : status === "error"
              ? "Verification failed"
              : "Verify your email"}
          </h1>

          {/* Description */}
          <p className="text-base text-gray-500 mb-8 leading-relaxed">
            {status === "success"
              ? message
              : status === "error"
              ? message
              : "Click the button below to verify your email address and activate your Assistly account."}
          </p>

          {/* Button */}
          {status === "success" ? (
            <a
              href="/login"
              className="inline-block w-full py-4 rounded-2xl text-base font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#1A3A2A", color: "#F4EFE8", fontSize: "16px" }}
            >
              Continue to login →
            </a>
          ) : status === "error" ? (
            <div className="flex flex-col gap-3">
              <a
                href="/register"
                className="inline-block w-full py-4 rounded-2xl text-base font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ background: "#1A3A2A", color: "#F4EFE8", fontSize: "16px" }}
              >
                Back to register
              </a>
              <p className="text-sm text-gray-400">
                Need a new link?{" "}
                <a href="/resend-verification" className="font-semibold hover:underline" style={{ color: "#1A3A2A" }}>
                  Resend verification email
                </a>
              </p>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full py-4 rounded-2xl text-base font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "#1A3A2A",
                color: "#F4EFE8",
                opacity: loading ? 0.75 : 1,
                fontSize: "16px",
              }}
            >
              {loading ? "Verifying..." : "Verify my email →"}
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Wrong email?{" "}
          <a href="/register" className="font-semibold hover:underline" style={{ color: "#1A3A2A" }}>
            Register again
          </a>
        </p>
      </div>
    </div>
  );
}