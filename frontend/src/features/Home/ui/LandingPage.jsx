import { useState, useEffect } from "react";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import Navbar from "@/components/Navbar";
import InfiniteScrollbar from "./components/InfiniteScrollbar";
import ServicesSection from "./components/Services";
import Features from "./components/Features";
import Footer from "@/components/Footer";
import Hero from "./components/HeroSection";
import BroadSupport from "./components/BroadSupport";
import CrazyTransitionSection from "./components/HorizontalPage";
import Ease from "./components/Ease";
import CaseStudySection from "./components/CaseStudy";

const MOUNTAIN_BG ="https://ik.imagekit.io/cryg162lg/bg-cream.jpg";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen font-sans overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,160,20,0.4); }
          50%       { box-shadow: 0 0 45px rgba(255,160,20,0.8); }
        }

        .anim-fade-up-1 { animation: fadeUp 0.9s ease forwards; }
        .anim-fade-up-2 { animation: fadeUp 0.9s 0.18s ease both; }
        .anim-fade-up-3 { animation: fadeUp 0.9s 0.34s ease both; }
        .anim-fade-up-4 { animation: fadeUp 0.9s 0.50s ease both; }
        .anim-fade-in   { animation: fadeIn 1.2s 0.6s ease both; }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #fff 0%, #fff 35%,
            #ffdb80 50%,
            #fff 65%, #fff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .btn-primary:hover { transform: translateY(-2px) scale(1.03); }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .btn-primary:hover::after { transform: translateX(100%); }

        .btn-ghost {
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover {
          transform: translateY(-2px) scale(1.03);
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.6);
        }

        .float-badge { animation: float 4s ease-in-out infinite; }
        .float-badge-delay { animation: float 4s 1.5s ease-in-out infinite; }

        .nav-glass {
          background: ${scrolled ? "rgba(20,8,0,0.55)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(14px)" : "none"};
          border-bottom: ${scrolled ? "1px solid rgba(255,200,80,0.12)" : "none"};
          transition: background 0.4s, backdrop-filter 0.4s;
        }

        .overlay-gradient {
          background: linear-gradient(
            to right,
            rgba(15,5,0,0.72) 0%,
            rgba(20,6,0,0.55) 40%,
            rgba(0,0,0,0.05) 100%
          );
        }

        .hero-line {
          line-height: 1.06;
          letter-spacing: -0.03em;
        }
      `}</style>

      {/* ── HERO ── */}
      <Hero/>


      {/* infinite scrollbar  */}

      <InfiniteScrollbar/>

      <BroadSupport/>

      <CrazyTransitionSection/>

        <Ease/>
        {/* <PricingSection/> */}
        <CaseStudySection/>
  
      

      
  
       
    


     

      
    </main>
  );
}