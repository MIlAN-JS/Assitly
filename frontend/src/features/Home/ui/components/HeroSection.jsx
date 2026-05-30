import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMessageSquare, FiZap, FiShield, FiTrendingUp } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri";

// ── Floating chat bubble animation ──────────────────────────────────────────
const ChatBubble = ({ message, from, delay, x, y }) => (
  <div
    className="absolute hidden lg:flex flex-col gap-1 animate-float"
    style={{
      left: x,
      top: y,
      animationDelay: delay,
      opacity: 0,
      animation: `floatIn 0.6s ease forwards, bobble 4s ease-in-out ${delay} infinite`,
    }}
  >
    <div
      className={`px-4 py-2.5 rounded-2xl text-xs font-medium shadow-md max-w-[180px] leading-relaxed
        ${from === "ai"
          ? "bg-[#1a3a2a] text-white rounded-bl-sm"
          : "bg-white text-[#1a3a2a] border border-[#1a3a2a]/10 rounded-br-sm"
        }`}
    >
      {from === "ai" && (
        <span className="flex items-center gap-1 mb-1 opacity-60 text-[10px] uppercase tracking-wider">
          <RiCustomerService2Fill size={10} /> Assistly AI
        </span>
      )}
      {message}
    </div>
  </div>
);

// ── Stat pill ────────────────────────────────────────────────────────────────
const StatPill = ({ icon, value, label, delay }) => (
  <div
    className="flex items-center gap-3 bg-white border border-[#1a3a2a]/10 rounded-xl px-5 py-3.5 shadow-sm"
    style={{ animation: `slideUp 0.5s ease forwards`, animationDelay: delay, opacity: 0 }}
  >
    <div className="w-9 h-9 rounded-lg bg-[#1a3a2a]/8 flex items-center justify-center text-[#1a3a2a]">
      {icon}
    </div>
    <div>
      <div className="text-lg font-bold text-[#1a3a2a] leading-none">{value}</div>
      <div className="text-xs text-[#1a3a2a]/55 mt-0.5">{label}</div>
    </div>
  </div>
);

// ── Partner logo pill ────────────────────────────────────────────────────────
const PartnerLogo = ({ name, icon, color }) => (
  <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#1a3a2a]/10 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default select-none">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <span className="text-sm font-semibold text-[#1a3a2a]/70 whitespace-nowrap">{name}</span>
  </div>
);

// ── Main Hero ────────────────────────────────────────────────────────────────
const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chatBubbles = [
    { message: "Hey! I need help with my order #4821.", from: "user", delay: "0.8s", x: "3%", y: "12%" },
    { message: "I've found your order. It ships tomorrow by 6 PM! 🚀", from: "ai", delay: "1.2s", x: "3%", y: "28%" },
    { message: "Can I get a refund for this product?", from: "user", delay: "1.6s", x: "72%", y: "10%" },
    { message: "Absolutely! Refund processed in 2–3 business days.", from: "ai", delay: "2s", x: "67%", y: "26%" },
    { message: "Response time dropped by 80% 🎉", from: "ai", delay: "2.4s", x: "70%", y: "52%" },
  ];

  const partners = [
    { name: "Sequoia Capital", icon: "S", color: "bg-orange-100 text-orange-600" },
    { name: "Y Combinator", icon: "Y", color: "bg-red-100 text-red-500" },
    { name: "Andreessen", icon: "a16z", color: "bg-blue-100 text-blue-600" },
    { name: "Accel", icon: "A", color: "bg-violet-100 text-violet-600" },
    { name: "Tiger Global", icon: "T", color: "bg-amber-100 text-amber-600" },
    { name: "Lightspeed", icon: "L", color: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes floatIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes bobble {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .hero-font { font-family: 'Lora', Georgia, serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <section
        className="body-font relative min-h-[90vh] bg-[#f5f0e8] overflow-hidden flex flex-col"
      >

        {/* ── subtle grain texture overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ── decorative circle blobs ── */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#1a3a2a]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#1a3a2a]/6 blur-3xl" />

        {/* ── floating chat bubbles ── */}
        {mounted && chatBubbles.map((b, i) => <ChatBubble key={i} {...b} />)}

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 flex-1 justify-center">

          {/* badge */}
          <div
            className="flex items-center gap-2 bg-white border border-[#1a3a2a]/15 rounded-full px-4 py-1.5 mb-8 shadow-sm"
            style={{ animation: "slideUp 0.5s ease forwards", opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-[#1a3a2a]/70 tracking-wide">AI-Powered Customer Support Platform</span>
          </div>

          {/* headline */}
          <h1
            className="hero-font text-[2.8rem] sm:text-[3.8rem] md:text-[5rem] font-bold text-[#1a3a2a] leading-[1.1] max-w-3xl mb-6"
            style={{ animation: "slideUp 0.5s ease 0.1s forwards", opacity: 0 }}
          >
            Smarter replies,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">happy customers.</span>
              {/* underline squiggle */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="#1a3a2a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3"/>
              </svg>
            </span>
          </h1>

          {/* subtext */}
          <p
            className="text-base sm:text-lg text-[#1a3a2a]/60 max-w-xl leading-relaxed mb-10"
            style={{ animation: "slideUp 0.5s ease 0.2s forwards", opacity: 0 }}
          >
            Deploy an AI-powered support bot on your website in minutes. Configure once, embed anywhere — and let your customers get instant, accurate answers 24/7.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            style={{ animation: "slideUp 0.5s ease 0.3s forwards", opacity: 0 }}
          >
            <Link
              to="/register"
              className="group flex items-center gap-2 bg-[#1a3a2a] text-white text-sm font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#1a3a2a]/20"
            >
              Get Started — it's free
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={16} />
            </Link>
            <Link
              to="/demo"
              className="flex items-center gap-2 text-[#1a3a2a] text-sm font-medium border border-[#1a3a2a]/20 px-7 py-3.5 rounded-lg hover:bg-[#1a3a2a]/5 transition-all duration-200"
            >
              <FiMessageSquare size={15} />
              See it in action
            </Link>
          </div>

          {/* stat pills */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-4"
            style={{ animation: "slideUp 0.5s ease 0.4s forwards", opacity: 0 }}
          >
            <StatPill icon={<FiZap size={16} />} value="3 min" label="Average setup time" delay="0.5s" />
            <StatPill icon={<FiTrendingUp size={16} />} value="80%" label="Faster response time" delay="0.6s" />
            <StatPill icon={<FiShield size={16} />} value="99.9%" label="Uptime guaranteed" delay="0.7s" />
          </div>

        </div>

        {/* ── BACKED BY SECTION ── */}
      

      </section>
    </>
  );
};

export default Hero;