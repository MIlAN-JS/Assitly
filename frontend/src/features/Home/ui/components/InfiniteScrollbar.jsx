import { useState } from "react";

const logos = [
  {
    name: "Google",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Slack",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
  },
  {
    name: "Spotify",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  {
    name: "Airbnb",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Notion",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
  {
    name: "Figma",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "Stripe",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "Dropbox",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Dropbox_Logo_2013.svg",
  },
  {
    name: "Zoom",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/11/Zoom_Logo_2022.svg",
  },
];

// Duplicate logos for seamless infinite loop
const duplicated = [...logos, ...logos];

export default function InfiniteScrollbar() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .slider-track {
          animation: scroll-left 28s linear infinite;
        }

        .slider-track.paused {
          animation-play-state: paused;
        }

        .logo-card {
          transition: filter 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
        }

        .logo-card:hover {
          filter: none !important;
          transform: scale(1.06);
          opacity: 1 !important;
        }

        .slider-wrapper:hover .logo-card {
          filter: grayscale(100%);
          opacity: 0.45;
        }

      `}</style>

<h1 className="text-center bg-[#F1EDE5]">Backed by leading Investors</h1>
      <section
        className="w-full py-16 overflow-hidden"
        style={{ backgroundColor: "#F4EFE7", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header
        <div className="text-center mb-10 px-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-zinc-500 mb-2">
            Trusted by world-class teams
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-semibold">
            Companies that rely on{" "}
            <span style={{ color: "#f59e0b" }}>Hermes AI</span>
          </h2>
        </div> */}

        {/* Slider */}
        <div
          className="relative slider-wrapper"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Fade masks */}
          <div className="fade-left pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10" />
          <div className="fade-right pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10" />

          {/* Track */}
          <div className={`slider-track flex items-center gap-8 sm:gap-14 w-max ${paused ? "paused" : ""}`}>
            {duplicated.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="logo-card flex items-center justify-center flex-shrink-0 cursor-pointer"
                style={{
                  width: "120px",
                  height: "56px",
                  filter: "grayscale(100%)",
                  opacity: 0.55,
                }}
                title={logo.name}
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ maxWidth: "110px", maxHeight: "44px" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom label */}
        
      </section>
    </>
  );
}