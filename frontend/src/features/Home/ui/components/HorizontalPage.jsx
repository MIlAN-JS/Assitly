import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EaseTransitionSection = () => {
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  // reset refs safely
  linesRef.current = [];
  const setLineRef = (el) => {
    if (el) linesRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      // 🔥 Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Labels for sanity
      tl.addLabel("start", 0);

      // 🌈 Background transition
      tl.to(containerRef.current, {
        backgroundColor: "#B2DBB8",
        duration: 1,
      }, "start+=0.5");

      // ✨ Lines motion (with depth feel)
      linesRef.current.forEach((line, i) => {
        tl.to(
          line,
          {
            x: () => window.innerWidth * 1.2,
            opacity: 0.9,
            scaleX: 1.2,
            duration: 2,
            ease: "none",
          },
          "start+=" + i * 0.06 // smooth stagger
        );
      });

      // 🧠 Problem fades out
      tl.to(
        q(".problem-text"),
        {
          opacity: 0,
          y: -30,
          duration: 0.5,
        },
        "start+=0.4"
      );

      // 💡 Solution fades in
      tl.fromTo(
        q(".solution-text"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "start+=0.65"
      );

      // 🔗 Lines merge effect
      tl.to(
        linesRef.current,
        {
          scaleY: 0.05,
          opacity: 0,
          transformOrigin: "center",
          duration: 0.6,
          stagger: 0.03,
        },
        "start+=1.6"
      );

      // 🌌 Subtle parallax on text
      tl.to(
        q(".text-wrapper"),
        {
          y: -40,
          duration: 2,
        },
        "start"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#F5F0E8]"
    >
      {/* 🔹 Background Lines */}
      <div className="absolute inset-0 flex flex-col justify-around py-20 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            ref={setLineRef}
            className="h-[2px] w-40 bg-black/10 -ml-40 will-change-transform"
            style={{
              transform: "translateZ(0)", // GPU hint
            }}
          />
        ))}
      </div>

      {/* 🔹 Text Content */}
      <div className="text-wrapper relative z-10 text-center px-6">
        <div className="problem-text">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">
            The Problem
          </h2>
          <p className="text-xl max-w-md mx-auto text-black/70">
            Fragmented systems are inefficient. They slow intake and burden staff.
          </p>
        </div>

        <div className="solution-text absolute inset-0 opacity-0">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">
            The Solution
          </h2>
          <p className="text-xl max-w-md mx-auto text-black/80">
            One AI-powered system for referrals, clinical notes, and billing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EaseTransitionSection;