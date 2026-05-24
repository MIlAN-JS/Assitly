import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdLockReset } from "react-icons/md";
import { resetPasswordService } from "../../service/auth.services";
import { toast } from "sonner";

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

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [message, setMessage] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordService({ token, password });
      setStatus("success");
      setMessage("Your password has been reset successfully!");
      toast.success("Your password has been reset successfully")
    } catch (error) {
      setStatus("error");
      setMessage(error);
      toast.error(error)
    } finally {
      setLoading(false);
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
        <div className="bg-white rounded-3xl p-8 sm:p-10" style={{ border: "1px solid #e0d9d0" }}>

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
              <MdLockReset size={44} color="#1A3A2A" />
            )}
          </div>

          {/* Heading */}
          <h1
            className="text-3xl font-bold mb-3 tracking-tight text-center"
            style={{ color: "#1A3A2A", fontFamily: "Mozilla Headline, 'Times New Roman', serif" }}
          >
            {status === "success" ? "Password reset!" : status === "error" && !password ? "Link invalid" : "Reset password"}
          </h1>

          {/* Success state */}
          {status === "success" ? (
            <div className="text-center">
              <p className="text-base text-gray-500 mb-8 leading-relaxed">{message}</p>
              <a
                href="/login"
                className="inline-block w-full py-4 rounded-2xl text-base font-semibold transition-all hover:opacity-90 active:scale-95 text-center"
                style={{ background: "#1A3A2A", color: "#F4EFE8", fontSize: "16px" }}
              >
                Continue to login →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <p className="text-base text-gray-500 text-center mb-2 leading-relaxed">
                Choose a strong new password for your account.
              </p>

              {/* Error message */}
              {status === "error" && (
                <div
                  className="px-4 py-3 rounded-xl text-sm font-medium"
                  style={{ background: "#fff5f5", color: "#e53e3e", border: "1px solid #fed7d7" }}
                >
                  {message}
                </div>
              )}

              {/* New password */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3A2A" }}>
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A3A2A" }}>
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    className="w-full px-4 py-3.5 rounded-xl outline-none transition-all placeholder-gray-300 pr-12"
                    style={{ border: "1px solid #e0d9d0", color: "#1A3A2A", fontSize: "16px" }}
                    onFocus={(e) => (e.target.style.border = "1.5px solid #1A3A2A")}
                    onBlur={(e) => (e.target.style.border = "1px solid #e0d9d0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-base font-semibold transition-all hover:opacity-90 active:scale-95 mt-2"
                style={{
                  background: "#1A3A2A",
                  color: "#F4EFE8",
                  opacity: loading ? 0.75 : 1,
                  fontSize: "16px",
                }}
              >
                {loading ? "Resetting password..." : "Reset password →"}
              </button>
            </form>
          )}

          {/* Back to login */}
          {status !== "success" && (
            <p className="text-center text-sm text-gray-400 mt-6">
              Remember your password?{" "}
              <a href="/login" className="font-semibold hover:underline" style={{ color: "#1A3A2A" }}>
                Sign in
              </a>
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5 px-4">
          Need help?{" "}
          <a href="/contact" className="hover:underline" style={{ color: "#1A3A2A" }}>Contact support</a>
        </p>
      </div>
    </div>
  );
}