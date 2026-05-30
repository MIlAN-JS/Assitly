import { useState } from "react";
import { FiCopy, FiCheck, FiMenu, FiX } from "react-icons/fi";
import {
  RiRocketLine,
  RiCodeSSlashLine,
  RiPaletteLine,
  RiRobot2Line,
  RiBookOpenLine,
  RiFileTextLine,
  RiTerminalLine,
} from "react-icons/ri";

const BRAND = "#1A3A2A";

// ─── Code Block ────────────────────────────────────────────────────────────
function CodeBlock({ code, language = "html" }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden my-4 border border-white/5">
      <div className="flex items-center justify-between px-5 py-3 bg-[#1a2332] border-b border-white/10">
        <span className="text-xs text-white/40 font-mono uppercase">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
        >
          {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-[#111827] p-5 text-sm font-mono text-green-300 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all m-0">
        {code}
      </pre>
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────
function Section({ id, children }) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      {children}
    </section>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E5E7EB]">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0F5F2" }}>
        <Icon size={18} color={BRAND} />
      </div>
      <h2 className="text-2xl font-black" style={{ color: BRAND }}>{title}</h2>
    </div>
  );
}

function Paragraph({ children }) {
  return <p className="text-gray-600 leading-relaxed mb-4 text-base">{children}</p>;
}

function SubTitle({ children }) {
  return <h3 className="text-lg font-bold mt-8 mb-3" style={{ color: BRAND }}>{children}</h3>;
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] my-4">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: "#F0F5F2" }}>
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-3 text-left font-bold" style={{ color: BRAND }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#E5E7EB] hover:bg-gray-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-gray-600">
                  {j === 0 ? <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono text-gray-800">{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ children, color = "green" }) {
  const colors = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[color]}`}>
      {children}
    </span>
  );
}

function Callout({ type = "info", children }) {
  const styles = {
    info: { bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8", icon: "ℹ️" },
    tip: { bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D", icon: "💡" },
    warning: { bg: "#FFFBEB", border: "#FDE68A", color: "#B45309", icon: "⚠️" },
  };
  const s = styles[type];
  return (
    <div
      className="flex gap-3 p-4 rounded-xl my-4 text-sm leading-relaxed"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      <span className="flex-shrink-0">{s.icon}</span>
      <span>{children}</span>
    </div>
  );
}

// ─── Nav items ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "getting-started", label: "Getting Started", icon: RiRocketLine },
  { id: "installation", label: "Installation", icon: RiCodeSSlashLine },
  { id: "customization", label: "Customization", icon: RiPaletteLine },
  { id: "training", label: "Training Your Bot", icon: RiRobot2Line },
  
  { id: "faq", label: "FAQ", icon: RiBookOpenLine },
];

// ─── Logo ──────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <svg width="140" viewBox="0 0 520 120">
      <rect x="0" y="10" width="100" height="100" rx="22" fill="#1a3a2a" />
      <path d="M28 72 Q50 30 72 72" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M38 58 L62 58" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="72" cy="72" r="5" fill="#ffffff" />
      <text x="118" y="58%" dominantBaseline="middle" fontFamily="serif" fontSize="100" fontWeight="700" fill="#1a3a2a">
        Assistly
      </text>
    </svg>
  );
}

// ─── Main Docs Page ────────────────────────────────────────────────────────
export default function Docs() {
  const [active, setActive] = useState("getting-started");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollTo = (id) => {
    setActive(id);
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen " style={{ background: "#F4EFE8", fontFamily: "sans-serif" }}>

      {/* Top nav */}
    

      <div className="flex max-w-7xl mx-auto ">

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 h-[calc(100vh-64px)] w-64 flex-shrink-0 bg-white border-r border-[#E5E7EB] overflow-y-auto z-40 transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <nav className="p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Contents</p>
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-1 text-left"
                style={{
                  background: active === item.id ? "#F0F5F2" : "transparent",
                  color: active === item.id ? BRAND : "#6B7280",
                }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 px-6 lg:px-12 py-10 max-w-3xl">

          {/* Hero */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: "#F0F5F2", color: BRAND }}>
              <RiFileTextLine size={13} /> Documentation v1.0
            </div>
            <h1 className="text-4xl font-black mb-4 leading-tight" style={{ color: BRAND }}>
              Assistly Developer Docs
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Everything you need to embed an AI-powered support bot on your website in minutes.
            </p>
          </div>

          {/* ── Getting Started ── */}
          <Section id="getting-started">
            <SectionTitle icon={RiRocketLine} title="Getting Started" />
            <Paragraph>
              Assistly lets you deploy an AI-powered customer support chatbot on your website in under 5 minutes.
              Just create an account, configure your bot, and paste a single script tag — no backend required.
            </Paragraph>

            <SubTitle>Prerequisites</SubTitle>
            <ul className="list-none space-y-2 mb-4">
              {[
                "An Assistly account (free to sign up)",
                "A website where you can edit the HTML",
                "Optional: a PDF or FAQ list to train your bot",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: "#F0F5F2", color: BRAND }}>{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>

            <SubTitle>Quick Start</SubTitle>
            <Paragraph>Follow these steps to get your bot live:</Paragraph>
            <div className="space-y-4 my-4">
              {[
                { step: "1", title: "Create an account", desc: "Sign up at assistly.com and create your business account." },
                { step: "2", title: "Configure your bot", desc: "Set your bot's name, colors, and welcome message in the dashboard." },
                { step: "3", title: "Train your bot", desc: "Add FAQs or upload a PDF to give your bot knowledge about your business." },
                { step: "4", title: "Embed the script", desc: "Copy the embed snippet and paste it before </body> on your website." },
              ].map(s => (
                <div key={s.step} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E5E7EB]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: "#F0F5F2", color: BRAND }}>
                    {s.step}
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ color: BRAND }}>{s.title}</p>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Installation ── */}
          <Section id="installation">
            <SectionTitle icon={RiCodeSSlashLine} title="Installation" />
            <Paragraph>
              No npm install needed. Assistly works by dropping a single script tag into your HTML.
              Get your unique bot ID from the <strong>Embed Code</strong> page in your dashboard.
            </Paragraph>

            <SubTitle>Embed Script</SubTitle>
            <Paragraph>Paste this snippet before the closing <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">&lt;/body&gt;</code> tag of every page where you want the chat widget to appear.</Paragraph>
            <CodeBlock
              language="html"
              code={`<script
  src="https://cdn.assistly.com/widget.js"
  data-bot-id="YOUR_BOT_ID"
></script>`}
            />

            <Callout type="tip">
              Replace <strong>YOUR_BOT_ID</strong> with the ID from your Assistly dashboard → Embed Code page.
            </Callout>

            <SubTitle>React / Next.js</SubTitle>
            <Paragraph>If you're using React or Next.js, add the script using a useEffect or next/script:</Paragraph>
            <CodeBlock
              language="jsx"
              code={`// Next.js
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Script
        src="https://cdn.assistly.com/widget.js"
        data-bot-id="YOUR_BOT_ID"
        strategy="lazyOnload"
      />
    </>
  )
}`}
            />

            <CodeBlock
              language="jsx"
              code={`// React (useEffect)
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.assistly.com/widget.js'
    script.setAttribute('data-bot-id', 'YOUR_BOT_ID')
    document.body.appendChild(script)
  }, [])

  return <div>...</div>
}`}
            />

            <SubTitle>WordPress</SubTitle>
            <Paragraph>Go to <strong>Appearance → Theme Editor → footer.php</strong> and paste the script before <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">&lt;/body&gt;</code>.</Paragraph>

            <Callout type="warning">
              Make sure the script loads on every page where you want the chat widget. If it only loads on some pages, the widget won't appear everywhere.
            </Callout>
          </Section>

          {/* ── Customization ── */}
          <Section id="customization">
            <SectionTitle icon={RiPaletteLine} title="Customization" />
            <Paragraph>
              You can customize the widget's appearance directly from your dashboard under <strong>Widget Customizer</strong>,
              or pass data attributes to the script tag for code-based configuration.
            </Paragraph>

            <SubTitle>Dashboard Options</SubTitle>
            <Table
              headers={["Option", "Description", "Default"]}
              rows={[
                ["primaryColor", "Main color of the widget header and buttons", "#1A3A2A"],
                ["textColor", "Color of text inside the widget", "#ffffff"],
                ["botName", "Display name shown in the widget header", "Support Bot"],
                ["welcomeMessage", "First message shown to users", "Hi! How can I help?"],
                ["placeholder", "Input field placeholder text", "Type a message..."],
                ["position", "Widget position: bottom-right or bottom-left", "bottom-right"],
                ["borderRadius", "Roundness of the widget corners (px)", "12"],
                ["botAvatar", "Custom avatar image URL for the bot", "—"],
                ["showBranding", "Show 'Powered by Assistly' footer", "true"],
              ]}
            />

           
            

          
          </Section>

          {/* ── Training ── */}
          <Section id="training">
            <SectionTitle icon={RiRobot2Line} title="Training Your Bot" />
            <Paragraph>
              Train your bot with your own data so it can answer questions specific to your business.
              Assistly supports two training methods: FAQs and PDF uploads.
            </Paragraph>

            <SubTitle>FAQs</SubTitle>
            <Paragraph>
              Add question and answer pairs directly from the <strong>Train Bot</strong> page in your dashboard.
              These are the most reliable way to ensure your bot gives accurate answers to common questions.
            </Paragraph>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 my-4 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Example FAQs</p>
              {[
                { q: "What are your business hours?", a: "We're open Monday to Friday, 9am to 6pm EST." },
                { q: "How do I request a refund?", a: "Email support@yourcompany.com with your order number." },
              ].map((faq, i) => (
                <div key={i} className="rounded-xl border border-[#E5E7EB] p-3">
                  <p className="text-sm font-bold mb-1" style={{ color: BRAND }}>Q: {faq.q}</p>
                  <p className="text-sm text-gray-500">A: {faq.a}</p>
                </div>
              ))}
            </div>

            <SubTitle>PDF Upload</SubTitle>
            <Paragraph>
              Upload a PDF (product catalog, policy document, manual) and Assistly will extract the text
              and use it to answer customer questions. Max file size is <strong>10MB</strong>.
            </Paragraph>
            <div className="flex flex-wrap gap-2 my-4">
              {["Product catalog", "Return policy", "User manual", "FAQ document", "Pricing guide"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-gray-500">
                  {tag}
                </span>
              ))}
            </div>

            <Callout type="tip">
              For best results, combine both FAQs and a PDF. FAQs give precise answers while the PDF provides broader context.
            </Callout>

            <SubTitle>System Prompt</SubTitle>
            <Paragraph>
              Set a custom system prompt to define your bot's personality and behavior. For example:
            </Paragraph>
            <CodeBlock
              language="text"
              code={`You are a friendly support assistant for Acme Inc.
Always be polite and concise.
If you don't know the answer, say "I'll connect you with a human agent."
Never discuss competitors.`}
            />
          </Section>

        

          {/* ── FAQ ── */}
          <Section id="faq">
            <SectionTitle icon={RiBookOpenLine} title="FAQ" />
            <div className="space-y-4">
              {[
                {
                  q: "Is Assistly free to use?",
                  a: "Yes! The free plan lets you embed a bot on your website with basic features. Upgrade to Kaleyv AI for advanced customization and API access.",
                },
                {
                  q: "Does the widget work on any website?",
                  a: "Yes. As long as you can add a script tag to your HTML, Assistly works on any platform — WordPress, Webflow, custom sites, and more.",
                },
                {
                  q: "How many FAQs can I add?",
                  a: "The free plan supports up to 50 FAQs. The Kaleyv AI plan has no limit.",
                },
                {
                  q: "Can I customize the widget colors?",
                  a: "Yes! You can change the primary color, text color, position, border radius, and avatar from the Widget Customizer in your dashboard.",
                },
                {
                  q: "Is my data secure?",
                  a: "All data is encrypted in transit and at rest. We never share your data with third parties.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                  <p className="font-bold text-sm mb-2" style={{ color: BRAND }}>{item.q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[#E5E7EB] text-center">
            <p className="text-sm text-gray-400">
              Still have questions?{" "}
              <a href="/contact" className="font-semibold hover:underline" style={{ color: BRAND }}>Contact support</a>
            </p>
            <p className="text-xs text-gray-300 mt-2">© 2026 Assistly · All rights reserved</p>
          </div>
        </main>
      </div>
    </div>
  );
}