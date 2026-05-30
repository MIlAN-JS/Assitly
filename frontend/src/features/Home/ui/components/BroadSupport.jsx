import React, { useEffect, useRef, useState } from "react";

// ── use IntersectionObserver to trigger count-up + fade-in ──────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.3, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ── animated count-up number ────────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 1800, inView }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  // format with commas
  const formatted = display >= 1000
    ? (display / 1000).toFixed(display % 1000 === 0 ? 0 : 1) + "K"
    : display.toString();
  return <>{display >= 1000 ? formatted : display}{suffix}</>;
}

// ── the scrolling word list on the left ─────────────────────────────────────
const useCases = [
  { label: "E-Commerce",   size: "text-4xl md:text-5xl", opacity: "opacity-100" },
  { label: "SaaS",         size: "text-2xl md:text-3xl", opacity: "opacity-60"  },
  { label: "Healthcare",   size: "text-4xl md:text-5xl", opacity: "opacity-100" },
  { label: "Fintech",      size: "text-xl md:text-2xl",  opacity: "opacity-45"  },
  { label: "Retail",       size: "text-3xl md:text-4xl", opacity: "opacity-80"  },
  { label: "Education",    size: "text-xl md:text-2xl",  opacity: "opacity-40"  },
  { label: "Real Estate",  size: "text-4xl md:text-5xl", opacity: "opacity-100" },
  { label: "Hospitality",  size: "text-2xl md:text-3xl", opacity: "opacity-55"  },
  { label: "Logistics",    size: "text-3xl md:text-4xl", opacity: "opacity-75"  },
  { label: "Legal",        size: "text-xl md:text-2xl",  opacity: "opacity-40"  },
];

// ── stat item ────────────────────────────────────────────────────────────────
const Stat = ({ value, suffix, label, inView, delay }) => (
  <div
    className="transition-all duration-700"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transitionDelay: delay,
    }}
  >
    <div
      className="font-bold text-[#1a3a2a] leading-none mb-2"
      style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}
    >
      <CountUp target={value} suffix={suffix} inView={inView} />
    </div>
    <div className="text-sm text-[#1a3a2a]/50 tracking-wide">{label}</div>
  </div>
);

// ── main component ───────────────────────────────────────────────────────────
const BroadSupport = () => {
  const [sectionRef, inView] = useInView();

  // auto-scroll the left panel
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame;
    let pos = 0;
    const speed = 0.55; // px per frame
    const step = () => {
      pos += speed;
      if (pos >= el.scrollHeight / 2) pos = 0;
      el.scrollTop = pos;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    el.addEventListener("mouseenter", () => cancelAnimationFrame(frame));
    el.addEventListener("mouseleave", () => { frame = requestAnimationFrame(step); });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .broad-scroll::-webkit-scrollbar { display: none; }
        .broad-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-[#f5f0e8] px-6 md:px-16 py-24"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
       <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center ">

  {/* LEFT */}
  <div
    className="relative rounded-2xl overflow-hidden flex items-center justify-center"
    style={{
      background: "#cfe3d3",
      height: "600px",
    }}
  >
    <div
      ref={scrollRef}
      className="broad-scroll h-full w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {[...useCases, ...useCases].map((item, i) => (
          <div
            key={i}
            className="text-[#1a3a2a] font-medium text-center transition-all duration-300"
            style={{
              fontFamily: "Lora, Georgia, serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              opacity: i % 2 === 0 ? 1 : 0.5,
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* RIGHT */}
  <div className="flex flex-col gap-8">

    {/* badge */}
    <span className="text-xs font-medium text-[#1a3a2a]/70 bg-[#1a3a2a]/10 px-4 py-1.5 rounded-lg w-fit">
      Broad AI support
    </span>

    {/* heading */}
    <h2
      className="text-[#1a3a2a] leading-tight"
      style={{
        fontFamily: "Lora, Georgia, serif",
        fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
        fontWeight: 500,
      }}
    >
      Assistly is built from the ground up for any business, with AI at the core.
    </h2>

    {/* stats */}
    <div className="flex gap-16 pt-4">
      <div>
        <div className="text-5xl font-medium text-[#1a3a2a]">
          $2.5K+
        </div>
        <p className="text-sm text-[#1a3a2a]/60 mt-2">
          claims processed
        </p>
      </div>

      <div>
        <div className="text-5xl font-medium text-[#1a3a2a]">
          11K+
        </div>
        <p className="text-sm text-[#1a3a2a]/60 mt-2">
          payor claims submitted
        </p>
      </div>
    </div>

  </div>
</div>
      </section>
    </>
  );
};

export default BroadSupport;