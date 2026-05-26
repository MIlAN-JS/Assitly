(function () {
  "use strict";

  // ─── Config ────────────────────────────────────────────────────────────────
  const SCRIPT_TAG = document.currentScript;
  const BOT_ID = SCRIPT_TAG?.getAttribute("botId") || "";
  const API_BASE = "http://localhost:3000/api";

  // ─── IDs / Session ─────────────────────────────────────────────────────────
  function getVisitorId() {
    let id = localStorage.getItem("assistly_visitor_id");
    if (!id) {
      id = "v_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("assistly_visitor_id", id);
    }
    return id;
  }
  function generateSessionId() {
    return "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  const visitorId = getVisitorId();
  let sessionId = generateSessionId();

  // ─── Defaults (Assistly theme) ─────────────────────────────────────────────
  const DEFAULTS = {
    primaryColor: "#1a3a2a",
    textColor: "#ffffff",
    position: "bottom-right",
    borderRadius: "16px",
    botName: "Support Bot",
    botAvatar: null,
    welcomeMessage: "Hi! How can I help you today?",
    placeholder: "Type a message...",
    autoOpen: false,
    showBranding: true,
  };

  // ─── Fetch bot settings ────────────────────────────────────────────────────
  async function fetchSettings() {
    if (!BOT_ID) return DEFAULTS;
    try {
      const res = await fetch(`${API_BASE}/bot/get-bot/${BOT_ID}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const ws = data?.widgetSettings || {};
      return { ...DEFAULTS, ...Object.fromEntries(Object.entries(ws).filter(([, v]) => v != null && v !== "")) };
    } catch {
      return DEFAULTS;
    }
  }

  // ─── CSS ───────────────────────────────────────────────────────────────────
  function injectStyles(cfg) {
    const pos = cfg.position === "bottom-left"
      ? "left: 24px; right: auto;"
      : "right: 24px; left: auto;";

    const css = `
      #assistly-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Georgia', 'Times New Roman', serif; }

      #assistly-root {
        position: fixed;
        bottom: 24px;
        ${pos}
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        align-items: ${cfg.position === "bottom-left" ? "flex-start" : "flex-end"};
        gap: 12px;
      }

      /* ── Toggle Button ── */
      #assistly-toggle {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: ${cfg.primaryColor};
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 24px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10);
        transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
      }
      #assistly-toggle:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 32px rgba(0,0,0,0.22);
      }
      #assistly-toggle:active { transform: scale(0.96); }
      #assistly-toggle svg { transition: opacity 0.15s, transform 0.2s; }
      #assistly-toggle .icon-chat { position: absolute; }
      #assistly-toggle .icon-close { position: absolute; opacity: 0; transform: rotate(-90deg); }
      #assistly-root.open #assistly-toggle .icon-chat { opacity: 0; transform: rotate(90deg); }
      #assistly-root.open #assistly-toggle .icon-close { opacity: 1; transform: rotate(0deg); }

      /* ── Widget Panel ── */
      #assistly-panel {
        width: 370px;
        max-width: calc(100vw - 32px);
        height: 560px;
        max-height: calc(100vh - 110px);
        background: #f5f0eb;
        border-radius: 20px;
        box-shadow: 0 8px 48px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform-origin: bottom ${cfg.position === "bottom-left" ? "left" : "right"};
        transform: scale(0.85) translateY(12px);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s ease;
      }
      #assistly-root.open #assistly-panel {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      /* ── Header ── */
      #assistly-header {
        background: ${cfg.primaryColor};
        padding: 16px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      #assistly-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
        border: 2px solid rgba(255,255,255,0.25);
      }
      #assistly-avatar img { width: 100%; height: 100%; object-fit: cover; }
      #assistly-header-info { flex: 1; min-width: 0; }
      #assistly-bot-name {
        font-size: 15px;
        font-weight: 700;
        color: ${cfg.textColor};
        letter-spacing: 0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #assistly-status {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 2px;
      }
      .assistly-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #4ade80;
        animation: assistly-pulse 2s infinite;
      }
      @keyframes assistly-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.85); }
      }
      #assistly-status span {
        font-size: 11.5px;
        color: rgba(255,255,255,0.75);
        font-family: 'Georgia', serif;
      }
      #assistly-close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: rgba(255,255,255,0.7);
        padding: 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        transition: color 0.15s, background 0.15s;
      }
      #assistly-close-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

      /* ── Messages ── */
      #assistly-messages {
        flex: 1;
        overflow-y: auto;
        padding: 18px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scroll-behavior: smooth;
      }
      #assistly-messages::-webkit-scrollbar { width: 4px; }
      #assistly-messages::-webkit-scrollbar-track { background: transparent; }
      #assistly-messages::-webkit-scrollbar-thumb { background: rgba(26,58,42,0.2); border-radius: 4px; }

      /* ── FIX: each message row gets horizontal padding so bubbles
              never touch the panel walls regardless of overflow:hidden ── */
      .assistly-msg {
        display: flex;
        gap: 8px;
        align-items: flex-end;
        animation: assistly-msgIn 0.22s cubic-bezier(.34,1.2,.64,1);
        padding: 0 4px;
      }
      @keyframes assistly-msgIn {
        from { opacity: 0; transform: translateY(10px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      .assistly-msg.user { flex-direction: row-reverse; }

      .assistly-msg-avatar {
        width: 28px; height: 28px;
        border-radius: 50%;
        background: ${cfg.primaryColor};
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        overflow: hidden;
      }
      .assistly-msg-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .assistly-msg.user .assistly-msg-avatar { display: none; }

      .assistly-bubble {
        fontsize: 14px;
        word-break: break-word;
        
      }
      .assistly-msg.user .assistly-bubble {
        background: ${cfg.primaryColor};
        color: ${cfg.textColor};
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 4px;
      }

      /* typing indicator */
      .assistly-typing {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 12px 14px;
      }
      .assistly-typing span {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #9ca3af;
        animation: assistly-bounce 1.2s infinite;
      }
      .assistly-typing span:nth-child(2) { animation-delay: 0.15s; }
      .assistly-typing span:nth-child(3) { animation-delay: 0.30s; }
      @keyframes assistly-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-5px); opacity: 1; }
      }

      /* ── Input Area ── */
      #assistly-input-area {
        padding: 12px 14px;
        background: #fff;
        border-top: 1px solid rgba(26,58,42,0.1);
        display: flex;
        align-items: flex-end;
        gap: 10px;
        flex-shrink: 0;
      }
      #assistly-input {
        flex: 1;
        border: 1.5px solid #e5e0da;
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 14px;
        font-family: 'Georgia', serif;
        color: #1a1a1a;
        background: #faf8f5;
        resize: none;
        outline: none;
        min-height: 40px;
        max-height: 110px;
        line-height: 1.45;
        transition: border-color 0.15s, box-shadow 0.15s;
        overflow-y: auto;
      }
      #assistly-input::placeholder { color: #b0a898; }
      #assistly-input:focus {
        border-color: ${cfg.primaryColor};
        box-shadow: 0 0 0 3px ${cfg.primaryColor}22;
      }
      #assistly-send {
        width: 40px; height: 40px;
        border-radius: 10px;
        background: ${cfg.primaryColor};
        border: none;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        color: ${cfg.textColor};
        transition: transform 0.15s, opacity 0.15s;
        opacity: 0.5;
      }
      #assistly-send.active { opacity: 1; }
      #assistly-send:hover.active { transform: scale(1.08); }
      #assistly-send:active.active { transform: scale(0.95); }

      /* ── Branding ── */
      #assistly-branding {
        text-align: center;
        padding: 7px 0 9px;
        background: #fff;
        border-top: 1px solid rgba(26,58,42,0.06);
      }
      #assistly-branding a {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        color: #9ca3af;
        text-decoration: none;
        font-family: 'Georgia', serif;
        transition: color 0.15s;
      }
      #assistly-branding a:hover { color: ${cfg.primaryColor}; }

      /* ── Welcome card ── */
      .assistly-welcome {
        background: ${cfg.primaryColor}11;
        border: 1px solid ${cfg.primaryColor}22;
        border-radius: 14px;
        padding: 16px 24px;
        text-align: center;
        color: #3d5248;
        font-size: 14px;
        line-height: 1.55;
      }
    `;

    const style = document.createElement("style");
    style.id = "assistly-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ─── Avatar HTML ───────────────────────────────────────────────────────────
  function avatarHTML(cfg, size = 28) {
    if (cfg.botAvatar) {
      return `<img src="${cfg.botAvatar}" alt="${cfg.botName}" />`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.2)"/>
      <path d="M12 26 Q20 10 28 26" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M15 20 L25 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="28" cy="26" r="2.5" fill="white"/>
    </svg>`;
  }

  // ─── Build DOM ─────────────────────────────────────────────────────────────
  function buildWidget(cfg) {
    const root = document.createElement("div");
    root.id = "assistly-root";

    root.innerHTML = `
      <!-- Panel -->
      <div id="assistly-panel">
        <!-- Header -->
        <div id="assistly-header">
          <div id="assistly-avatar">${avatarHTML(cfg, 28)}</div>
          <div id="assistly-header-info">
            <div id="assistly-bot-name">${cfg.botName}</div>
            <div id="assistly-status">
              <div class="assistly-dot"></div>
              <span>Online</span>
            </div>
          </div>
          <button id="assistly-close-btn" title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div id="assistly-messages">
          <div class="assistly-msg bot">
            <div class="assistly-msg-avatar">${avatarHTML(cfg, 18)}</div>
            <div class="assistly-bubble assistly-welcome py-10 ">${cfg.welcomeMessage}</div>
          </div>
        </div>

        <!-- Input -->
        <div id="assistly-input-area">
          <textarea
            id="assistly-input"
            rows="1"
            placeholder="${cfg.placeholder}"
          ></textarea>
          <button id="assistly-send" title="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        ${cfg.showBranding ? `
        <div id="assistly-branding">
          <a href="https://assistly.ai" target="_blank" rel="noopener">
            <svg width="62" viewBox="0 0 520 120">
              <rect x="0" y="10" width="100" height="100" rx="22" fill="#1a3a2a"/>
              <path d="M28 72 Q50 30 72 72" stroke="#ffffff" stroke-width="7" fill="none" stroke-linecap="round"/>
              <path d="M38 58 L62 58" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
              <circle cx="72" cy="72" r="5" fill="#ffffff"/>
              <text x="118" y="58%" dominant-baseline="middle" font-family="Georgia, serif" font-size="100" font-weight="700" fill="#1a3a2a">Assistly</text>
            </svg>
          </a>
        </div>` : ""}
      </div>

      <!-- Toggle FAB -->
      <button id="assistly-toggle" title="Chat with us">
        <svg class="icon-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    document.body.appendChild(root);
    return root;
  }

  // ─── Chat logic ────────────────────────────────────────────────────────────
  function appendMessage(role, text) {
    const messages = document.getElementById("assistly-messages");
    const cfg = window.__assistlyCfg || DEFAULTS;

    const div = document.createElement("div");
    div.className = `assistly-msg ${role}`;

    if (role === "bot") {
      div.innerHTML = `
        <div class="assistly-msg-avatar">${avatarHTML(cfg, 18)}</div>
        <div class="assistly-bubble">${escapeHtml(text)}</div>
      `;
    } else {
      div.innerHTML = `<div class="assistly-bubble">${escapeHtml(text)}</div>`;
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function showTyping() {
    const messages = document.getElementById("assistly-messages");
    const div = document.createElement("div");
    div.className = "assistly-msg bot";
    div.id = "assistly-typing";
    div.innerHTML = `
      <div class="assistly-msg-avatar">${avatarHTML(window.__assistlyCfg || DEFAULTS, 18)}</div>
      <div class="assistly-bubble assistly-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById("assistly-typing");
    if (el) el.remove();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    appendMessage("user", text);
    showTyping();

    try {
      const res = await fetch(`${API_BASE}/bot/chat/${BOT_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, sessionId, message: text }),
      });

      hideTyping();

      if (!res.ok) {
        appendMessage("bot", "Sorry, something went wrong. Please try again.");
        return;
      }

      const data = await res.json();
      const reply =
        data?.message ||
        data?.reply ||
        data?.response ||
        data?.content ||
        "Sorry, I didn't get a response.";
      appendMessage("bot", reply);
    } catch {
      hideTyping();
      appendMessage("bot", "Unable to connect. Please check your connection.");
    }
  }

  // ─── Events ────────────────────────────────────────────────────────────────
  function attachEvents(root, cfg) {
    const toggle = document.getElementById("assistly-toggle");
    const closeBtn = document.getElementById("assistly-close-btn");
    const input = document.getElementById("assistly-input");
    const sendBtn = document.getElementById("assistly-send");

    function openWidget() {
      root.classList.add("open");
      sessionId = generateSessionId();
      setTimeout(() => input.focus(), 250);
    }
    function closeWidget() {
      root.classList.remove("open");
    }

    toggle.addEventListener("click", () => {
      root.classList.contains("open") ? closeWidget() : openWidget();
    });
    closeBtn.addEventListener("click", closeWidget);

    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 110) + "px";
      sendBtn.classList.toggle("active", input.value.trim().length > 0);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        doSend();
      }
    });

    sendBtn.addEventListener("click", doSend);

    function doSend() {
      const val = input.value.trim();
      if (!val) return;
      input.value = "";
      input.style.height = "auto";
      sendBtn.classList.remove("active");
      sendMessage(val);
    }

    if (cfg.autoOpen) {
      setTimeout(openWidget, 800);
    }
  }

  // ─── Init ──────────────────────────────────────────────────────────────────
  async function init() {
    const cfg = await fetchSettings();
    window.__assistlyCfg = cfg;
    injectStyles(cfg);
    const root = buildWidget(cfg);
    attachEvents(root, cfg);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();