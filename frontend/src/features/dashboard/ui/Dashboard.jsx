import useBot from "@/features/bot/hook/useBot";
import { useEffect, useState } from "react";
import { FiHome, FiMessageSquare, FiSettings, FiCode, FiBarChart2, FiChevronRight, FiCopy, FiCheck, FiEye, FiEyeOff, FiZap, FiUsers, FiTrendingUp, FiClock, FiMenu, FiX, FiSun, FiMoon, FiEdit2, FiSave  ,FiInfo} from "react-icons/fi";
import { useSelector } from "react-redux";
import FaqsPage from "@/features/faq/ui/CreateFaq";


const BRAND = "#1a3a2a";
const BRAND_LIGHT = "#e8f0ec";
const BRAND_MID = "#2d5c42";

function Logo({ size = 160 }) {
  return (
    <svg width={size} viewBox="0 0 520 120">
      <rect x="0" y="10" width="100" height="100" rx="22" fill="#1a3a2a" />
      <path d="M28 72 Q50 30 72 72" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M38 58 L62 58" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="72" cy="72" r="5" fill="#ffffff" />
      <text x="118" y="58%" dominantBaseline="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="100" fontWeight="700" fill="#1a3a2a">Assistly</text>
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "overview", icon: FiHome, label: "Overview" },
  { id: "bot", icon: FiSettings, label: "Bot Settings" },
  { id: "widget", icon: FiEye, label: "Widget Customizer" },
  { id: "embed", icon: FiCode, label: "Embed Code" },
  { id: "analytics", icon: FiBarChart2, label: "Analytics" },
  {id : "FAQs" , icon : FiInfo  , label : "FAQs"}
];

// const MOCK_CONVERSATIONS = [
//   { id: 1, visitor: "v_3k9x2m", preview: "How do I track my order?", time: "2 min ago", msgs: 6, resolved: true },
//   { id: 2, visitor: "v_8p1qr4", preview: "I want to return a product", time: "14 min ago", msgs: 4, resolved: false },
//   { id: 3, visitor: "v_7n2ws9", preview: "Do you ship internationally?", time: "1 hr ago", msgs: 3, resolved: true },
//   { id: 4, visitor: "v_0m4xt1", preview: "What payment methods do you accept?", time: "3 hr ago", msgs: 5, resolved: true },
//   { id: 5, visitor: "v_5c6yb8", preview: "My discount code isn't working", time: "5 hr ago", msgs: 9, resolved: false },
// ];

const MOCK_TRANSCRIPT = [
  { role: "bot", text: "Hi! How can I help you today?" },
  { role: "user", text: "How do I track my order?" },
  { role: "bot", text: "Sure! You can track your order by visiting the Orders page and entering your order ID. Would you like me to walk you through it?" },
  { role: "user", text: "Yes please" },
  { role: "bot", text: "Go to mystore.com/orders → enter your email and order number → click Track. You'll see real-time updates there." },
  { role: "user", text: "Got it, thanks!" },
];

// ── Overview Page ──────────────────────────────────────────────────────────
function OverviewPage() {
const {handleGetOverview} = useDashboard()

  useEffect(() => {
    handleGetOverview()
  }, [])

  const overview = useSelector(state => state.dash.overview)
  console.log(overview)



  const stats = [
    { icon: FiMessageSquare, label: "Total Conversations", value: overview?.totalConversations, change: "+12%", up: true },
    { icon: FiUsers, label: "Total Visitors", value: overview?.totalVisitors, change: "+8%", up: true },
    { icon: FiZap, label: "Avg Response Time", value: overview?.responseTime + " s", change: "-0.3s", up: true }
    // { icon: FiTrendingUp, label: "Resolution Rate", value: "87%", change: "+3%", up: true },
  ];
  
  const recent = overview?.recentConversations

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif", marginBottom: 6 }}>Good morning 👋</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Here's what's happening with your bot today.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif" }}>{s.value}</p>
              </div>
              <div style={{ background: BRAND_LIGHT, borderRadius: 10, padding: 10 }}>
                <s.icon size={18} color={BRAND} />
              </div>
            </div>
            <p style={{ fontSize: 12, color: s.up ? "#16a34a" : "#dc2626", marginTop: 10 }}>
              {s.change} <span style={{ color: "#9ca3af" }}>vs last week</span>
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 14 }}>Recent Conversations</h2>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
        {recent?.map((c, i) => (
          <div key={Date.now() + Math.random()} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i < recent.length - 1 ? "1px solid #f3f4f6" : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FiUsers size={15} color={BRAND} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 2 }}>{c.visitorId}</p>
              <p style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c?.content}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>{c.time}</span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 2, background: "#dcfce7" , color: "#16a34a" , fontWeight: 600 }}>
                resolved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// ── Bot Settings Page ──────────────────────────────────────────────────────
function BotSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    botName: "Support Bot",
    welcomeMessage: "Hi! How can I help you today?",
    placeholder: "Type a message...",
    systemPrompt: "Act as a helpful customer support assistant for an ecommerce business. Be concise, friendly, and helpful. If you cannot answer, escalate politely.",
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif", marginBottom: 6 }}>Bot Settings</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Configure how your bot behaves and introduces itself.</p>

      {[
        { key: "botName", label: "Bot Name", hint: "Displayed in the widget header" },
        { key: "welcomeMessage", label: "Welcome Message", hint: "First message visitors see" },
        { key: "placeholder", label: "Input Placeholder", hint: "Hint text in the message box" },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{f.label}</label>
          <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: "#1a1a1a", outline: "none", fontFamily: "Georgia, serif" }} />
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>{f.hint}</p>
        </div>
      ))}

      <div style={{ marginBottom: 32 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>System Prompt</label>
        <textarea value={form.systemPrompt} onChange={e => setForm({ ...form, systemPrompt: e.target.value })} rows={5}
          style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 13, color: "#1a1a1a", resize: "vertical", outline: "none", fontFamily: "Georgia, serif", lineHeight: 1.6 }} />
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>Instructions that define your bot's personality and knowledge scope.</p>
      </div>

      <button onClick={handleSave}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", background: BRAND, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "opacity 0.15s" }}>
        {saved ? <FiCheck size={16} /> : <FiSave size={16} />}
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ── Widget Customizer Page ─────────────────────────────────────────────────
function WidgetCustomizerPage() {
  const [cfg, setCfg] = useState({ primaryColor: "#1a3a2a", textColor: "#ffffff", position: "bottom-right", showBranding: true });

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 280px", minWidth: 280 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif", marginBottom: 6 }}>Widget Customizer</h1>
        <p style={{ color: "#6b7280", marginBottom: 28 }}>Adjust colors and layout. Preview updates live.</p>

        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Primary Color</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="color" value={cfg.primaryColor} onChange={e => setCfg({ ...cfg, primaryColor: e.target.value })}
              style={{ width: 44, height: 44, border: "1.5px solid #e5e7eb", borderRadius: 10, cursor: "pointer", padding: 3 }} />
            <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "monospace" }}>{cfg.primaryColor}</span>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Text Color</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="color" value={cfg.textColor} onChange={e => setCfg({ ...cfg, textColor: e.target.value })}
              style={{ width: 44, height: 44, border: "1.5px solid #e5e7eb", borderRadius: 10, cursor: "pointer", padding: 3 }} />
            <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "monospace" }}>{cfg.textColor}</span>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Position</label>
          <div style={{ display: "flex", gap: 10 }}>
            {["bottom-right", "bottom-left"].map(p => (
              <button key={p} onClick={() => setCfg({ ...cfg, position: p })}
                style={{ flex: 1, padding: "9px 0", border: `1.5px solid ${cfg.position === p ? cfg.primaryColor : "#e5e7eb"}`, borderRadius: 10, fontSize: 13, fontWeight: cfg.position === p ? 600 : 400, background: cfg.position === p ? cfg.primaryColor + "15" : "#fff", color: cfg.position === p ? cfg.primaryColor : "#6b7280", cursor: "pointer" }}>
                {p === "bottom-right" ? "Bottom Right" : "Bottom Left"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#f9fafb", borderRadius: 12, border: "1px solid #e5e7eb" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Show Branding</p>
            <p style={{ fontSize: 11, color: "#9ca3af" }}>Display "Powered by Assistly"</p>
          </div>
          <div onClick={() => setCfg({ ...cfg, showBranding: !cfg.showBranding })}
            style={{ width: 44, height: 24, borderRadius: 12, background: cfg.showBranding ? cfg.primaryColor : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: cfg.showBranding ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div style={{ flex: "1 1 300px", minWidth: 280 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 14 }}>Live Preview</p>
        <div style={{ background: "#f0ece6", borderRadius: 20, padding: 20, position: "relative", minHeight: 420 }}>
          <div style={{ width: "100%", maxWidth: 300, background: "#f5f0eb", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", margin: "0 auto" }}>
            <div style={{ background: cfg.primaryColor, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiMessageSquare size={14} color="#fff" />
              </div>
              <div>
                <p style={{ color: cfg.textColor, fontSize: 13, fontWeight: 700 }}>Support Bot</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>● Online</p>
              </div>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, minHeight: 160 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: cfg.primaryColor, flexShrink: 0 }} />
                <div style={{ background: "#fff", padding: "8px 12px", borderRadius: "12px 12px 12px 3px", fontSize: 12, color: "#1a1a1a", maxWidth: "75%" }}>
                  Hi! How can I help you today?
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: cfg.primaryColor, color: cfg.textColor, padding: "8px 12px", borderRadius: "12px 12px 3px 12px", fontSize: 12, maxWidth: "75%" }}>
                  I have a question
                </div>
              </div>
            </div>
            <div style={{ padding: "10px 12px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#f5f5f5", borderRadius: 8, padding: "7px 10px", fontSize: 11, color: "#b0a898" }}>Type a message...</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.primaryColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FiChevronRight size={14} color={cfg.textColor} />
              </div>
            </div>
            {cfg.showBranding && (
              <div style={{ textAlign: "center", padding: "6px 0", background: "#fff", fontSize: 10, color: "#9ca3af", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                Powered by Assistly
              </div>
            )}
          </div>

          <div style={{ position: "absolute", bottom: 20, right: cfg.position === "bottom-right" ? 20 : "auto", left: cfg.position === "bottom-left" ? 20 : "auto" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: cfg.primaryColor, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
              <FiMessageSquare size={20} color={cfg.textColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { embedCode } from "@/lib/utils.js";
import useDashboard from "../hook/useDashboard";

// ── Embed Code Page ────────────────────────────────────────────────────────
function EmbedCodePage() {
  const [copied, setCopied] = useState(false);
   const bot = useSelector(state => state.bot.bot)
   const embedUrl = embedCode(bot.customBotId)
  const code = embedUrl

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ maxWidth: 620 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif", marginBottom: 6 }}>Embed Code</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Paste this snippet before the closing <code style={{ background: "#f3f4f6", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>&lt;/body&gt;</code> tag of your website.</p>

      <div style={{ background: "#1a2332", borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>HTML</span>
          <button onClick={copy}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 7, color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer" }}>
            {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre style={{ margin: 0, padding: "20px 20px", fontSize: 13, color: "#a5d6a7", fontFamily: "monospace", lineHeight: 1.8, overflowX: "auto" }}>
          <code>{code}</code>
        </pre>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        {[
          { step: "1", title: "Copy the snippet", desc: "Click the copy button above" },
          { step: "2", title: "Paste in your HTML", desc: "Before the closing </body> tag" },
          { step: "3", title: "You're live!", desc: "The widget appears on your site" },
        ].map(s => (
          <div key={s.step} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: BRAND }}>{s.step}</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{s.title}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Analytics Page ─────────────────────────────────────────────────────────
function AnalyticsPage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const counts = [42, 67, 55, 89, 74, 31, 28];
  const max = Math.max(...counts);

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif", marginBottom: 6 }}>Analytics</h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Conversations over the last 7 days.</p>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "24px 28px", marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 20 }}>Daily Conversations</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
          {days.map((d, i) => (
            <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, color: "#6b7280" }}>{counts[i]}</span>
              <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: BRAND, height: `${(counts[i] / max) * 120}px`, transition: "height 0.3s", minHeight: 4 }} />
              <span style={{ fontSize: 11, color: "#9ca3af" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[
          { label: "Busiest Day", value: "Thursday", sub: "89 conversations" },
          { label: "Avg Daily", value: "55", sub: "conversations / day" },
          { label: "Top Question", value: "Order Tracking", sub: "34% of chats" },
          { label: "Unanswered", value: "3%", sub: "escalated to human" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "18px 20px" }}>
            <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: BRAND, fontFamily: "Georgia, serif", marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// function FAQsPage() {
//   return (
//     <h1>hello world</h1>
//   )
// }

// ── Shell ──────────────────────────────────────────────────────────────────
export default function AssistlyDashboard() {
  const [page, setPage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = { overview: OverviewPage, bot: BotSettingsPage, widget: WidgetCustomizerPage, embed: EmbedCodePage, analytics: AnalyticsPage , FAQs : FaqsPage};
  const PageComponent = pages[page];

  


  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8f7f4", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? 230 : 0, flexShrink: 0, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", overflow: "hidden", transition: "width 0.2s", height: "100vh", position: "sticky", top: 0 }}>
        <div style={{ padding: "20px 18px 12px", borderBottom: "1px solid #f3f4f6" }}>
          <Logo size={130} />
        </div>
        <nav style={{ flex: 1, padding: "10px 10px" }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: page === item.id ? BRAND_LIGHT : "transparent", color: page === item.id ? BRAND : "#6b7280", fontWeight: page === item.id ? 600 : 400, fontSize: 14, transition: "all 0.15s", marginBottom: 2, fontFamily: "Georgia, serif", textAlign: "left" }}>
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "14px 16px", borderTop: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiUsers size={14} color={BRAND} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>My Business</p>
              <p style={{ fontSize: 11, color: "#9ca3af" }}>Free plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 24px", background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4, display: "flex" }}>
            <FiMenu size={20} />
          </button>
          <div style={{ height: 18, width: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 14, color: "#9ca3af" }}>
            {NAV_ITEMS.find(n => n.id === page)?.label}
          </span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 32px" }}>
          <PageComponent />
        </div>
      </div>
    </div>
  );
}