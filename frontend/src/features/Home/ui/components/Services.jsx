import { useEffect, useRef } from "react";

const services = [
  {
    title: "Instant Automated Replies",
    description:
      "Automatically replies to common customer queries in real-time, reducing response time dramatically.",
  },
  {
    title: "Smart Ticket Classification & Routing",
    description:
      "Intelligently categorizes and assigns tickets to the right agent based on context and priority.",
  },
  {
    title: "AI-Powered Agent Suggestions",
    description:
      "Provides real-time reply suggestions to agents for faster and more accurate responses.",
  },
  {
    title: "Real-Time Chat System",
    description:
      "Enables seamless communication between customers and support teams with live updates.",
  },
  {
    title: "Multi-Tenant Architecture",
    description:
      "Supports multiple businesses on a single platform with secure and isolated environments.",
  },
];

const squares = [
  { top: "6%",  left: "28%", size: 70 },
  { top: "12%", left: "4%",  size: 52 },
  { top: "26%", left: "38%", size: 48 },
  { top: "62%", left: "2%",  size: 44 },
  { top: "70%", left: "32%", size: 80 },
  { top: "82%", left: "18%", size: 52 },
];

export default function ServicesSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);

  useEffect(() => {
    const loadGSAP = () => {
      if (window.gsap && window.ScrollTrigger) { initAnim(); return; }

      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      document.head.appendChild(s1);
      s1.onload = () => {
        const s2 = document.createElement("script");
        s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
        document.head.appendChild(s2);
        s2.onload = initAnim;
      };
    };

    const initAnim = () => {
      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        if (!section || !heading) return;

        gsap.fromTo(
          heading,
          { y: 0 },
          {
            y: () => section.offsetHeight - heading.offsetHeight - 300,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };

    loadGSAP();
    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');

        .services-section  { background-color: #fdf8ec; font-family: 'DM Sans', sans-serif; }
        .heading-font      { font-family: 'DM Serif Display', serif; }

        .deco-square {
          background-color: #f5e9b8;
          position: absolute;
          border-radius: 2px;
        }

        .service-row { border-top: 1px solid #d6c9a0; transition: background 0.2s; }
        .service-row:last-child { border-bottom: 1px solid #d6c9a0; }
        .service-row:hover { background: rgba(200,140,0,0.04); }

        .arrow-icon { display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }

        /* sticky left column only on desktop */
        @media (min-width: 1024px) {
          .left-col {
            position: sticky;
            top: 0;
            height: 100vh;
            overflow: hidden;
          }
          /* heading starts absolutely positioned at top */
          .heading-wrap {
            position: absolute;
            top: 72px;
            left: clamp(2rem, 8%, 4rem);
          }
        }
      `}</style>

      <section ref={sectionRef} className="services-section w-full">
        <div className="max-w-7xl mx-auto flex flex-col gap-30 lg:flex-row">

          {/* ── LEFT ── */}
          <div className="left-col relative lg:w-5/12 px-8 sm:px-12 lg:px-0 py-20 lg:py-0 min-h-64">

            {/* Decorative squares — full panel */}
            {squares.map((s, i) => (
              <div key={i} className="deco-square"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size }} />
            ))}

            {/* Scroll-driven heading */}
            <div ref={headingRef} className="heading-wrap relative z-10 max-w-xs px-8 lg:px-0">
              <h2
                className="heading-font text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl leading-tight"
                style={{ color: "#1a1208" }}
              >
                Your AI future
                <br />belongs in
                <br />your hands.{" "}
                <span style={{ color: "#c85a00", display: "inline-block", fontSize: "0.75em", verticalAlign: "middle" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3h14v13l-7-4-7 4V3z" />
                  </svg>
                </span>
              </h2>

            
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="lg:w-7/12 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
            {services.map((service, i) => (
              <div key={i} className="service-row py-8 sm:py-9">
                <h3 className="heading-font text-2xl sm:text-3xl mb-4"
                  style={{ color: "#1a1208", lineHeight: 1.2 }}>
                  {service.title}
                </h3>

                <div className="flex items-start gap-3">
                  <span className="arrow-icon" style={{ color: "#c85a00" }}>
                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
                      <path d="M13 2L19 7L13 12" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "#5a4a2a", maxWidth: "520px" }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}