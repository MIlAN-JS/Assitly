import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "../../hook/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../context/auth.slice";
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

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ businessName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // hooks 
  const {error , user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(error)
  console.log(user)



  useEffect(()=>{
    dispatch(clearError())
  },[])
  

  
  //custom hook 

  const {handleRegisterUser , handleGithubLogin , handleGoogleLogin} = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true)
    handleRegisterUser(form)
    
    setTimeout(() => {
      setLoading(false)
      navigate("/login")

    }, 2000);
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

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-2 tracking-tight"
            style={{ color: "#1A3A2A", fontFamily: "Mozilla Headline, 'Times New Roman', serif" }}
          >
            Create your account
          </h1>
          <p className="text-base text-gray-500">
            Start building smarter customer support today
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10" style={{ border: "1px solid #e0d9d0" }}>

          {/* OAuth buttons */}
          <div className="flex flex-col gap-3 mb-7">
            <button
              onClick={() => {
                console.log("google clicked")
                handleGoogleLogin()
              }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-base font-medium transition-all hover:bg-gray-50 active:scale-95"
              style={{ border: "1px solid #e0d9d0", color: "#1A3A2A" }}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
            <button
              onClick={() => {handleGithubLogin()}}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-base font-medium transition-all hover:bg-gray-50 active:scale-95"
              style={{ border: "1px solid #e0d9d0", color: "#1A3A2A" }}
            >
              <FaGithub size={22} color="#1A3A2A" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px" style={{ background: "#e0d9d0" }} />
            <span className="text-sm text-gray-400 whitespace-nowrap">or register with email</span>
            <div className="flex-1 h-px" style={{ background: "#e0d9d0" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Business name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3A2A" }}>
                Business name
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Acme Inc."
                required
                className="w-full px-4 py-3.5 rounded-xl outline-none transition-all placeholder-gray-300"
                style={{ border: "1px solid #e0d9d0", color: "#1A3A2A", fontSize: "16px" }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #1A3A2A")}
                onBlur={(e) => (e.target.style.border = "1px solid #e0d9d0")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3A2A" }}>
                Email address
              </label>
              <input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="you@company.com"
  required
  className={`
    w-full px-4 py-3.5 rounded-xl outline-none transition-all text-[16px]
    border
    placeholder-gray-300
    
  `}
/>
{/* {error && (
  <p className="text-red-500 text-sm mt-2 animate-pulse">
    {error}
  </p>
// )}  fix needed */}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3A2A" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full px-4 py-3.5 rounded-xl outline-none transition-all placeholder-gray-300 pr-12"
                  style={{ border: "1px solid #e0d9d0", color: "#1A3A2A", fontSize: "16px" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #1A3A2A")}
                  onBlur={(e) => (e.target.style.border = "1px solid #e0d9d0")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-base font-semibold transition-all active:scale-95 mt-2 hover:opacity-90"
              style={{
                background: "#1A3A2A",
                color: "#F4EFE8",
                opacity: loading ? 0.75 : 1,
                fontSize: "16px",
                letterSpacing: "0.01em",
              }}
            >
              {loading ? "Creating your account..." : "Create account →"}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/login" className="font-semibold hover:underline" style={{ color: "#1A3A2A" }}>
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5 px-4">
          By creating an account you agree to our{" "}
          <a href="/terms" className="hover:underline" style={{ color: "#1A3A2A" }}>Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" className="hover:underline" style={{ color: "#1A3A2A" }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}