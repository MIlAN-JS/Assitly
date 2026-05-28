

(function () {

  console.log("inside assistly")
  const scriptTag = document.currentScript;

  if (!scriptTag) {
    console.error("Assistly: unable to find script tag");
    return;
  }

  const botId = scriptTag.getAttribute("botId");

  if (!botId) {
    console.error("Assistly: missing botId attribute");
    return;
  }

  const API_BASE = "http://localhost:3000";

  // =========================
  // Visitor ID
  // =========================

  let visitorId = localStorage.getItem("assistly_visitor_id");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("assistly_visitor_id", visitorId);
  }

  // =========================
  // Session ID
  // =========================

  let sessionId = null;

  function createSession() {
    sessionId = crypto.randomUUID();
  }

  // =========================
  // State
  // =========================

  let settings = null;
  let isOpen = false;
  let messages = [];

  // =========================
  // Root Container + Shadow DOM
  // =========================

  const root = document.createElement("div");
  root.id = "assistly-root";

  document.body.appendChild(root);

  const shadow = root.attachShadow({ mode: "open" });

  // =========================
  // Styles
  // =========================

  const style = document.createElement("style");

  style.textContent = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Inter, Arial, sans-serif;
    }

    .assistly-container {
      position: fixed;
      bottom: 20px;
      z-index: 999999;
    }

    .assistly-window {
      width: 340px;
      height: 520px;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow:
        0 10px 40px rgba(0,0,0,0.16),
        0 2px 10px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      margin-bottom: 14px;
      animation: assistlyFadeIn .2s ease;
    }

    @keyframes assistlyFadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .assistly-header {
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      font-weight: 600;
      font-size: 14px;
    }

    .assistly-avatar {
      width: 36px;
      height: 36px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .assistly-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .assistly-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      background: #f6f7fb;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .assistly-message {
      max-width: 85%;
      padding: 10px 12px;
      font-size: 13px;
      line-height: 1.5;
      word-wrap: break-word;
    }

    .assistly-bot {
      align-self: flex-start;
      color: white;
    }

    .assistly-user {
      align-self: flex-end;
      background: white;
      border: 1px solid #e5e7eb;
      color: #111827;
    }

    .assistly-input-area {
      border-top: 1px solid #e5e7eb;
      padding: 12px;
      display: flex;
      gap: 8px;
      background: white;
    }

    .assistly-input {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
    }

    .assistly-send {
      border: none;
      color: white;
      width: 42px;
      height: 42px;
      border-radius: 999px;
      cursor: pointer;
      font-size: 16px;
      flex-shrink: 0;
    }

    .assistly-launcher {
      width: 58px;
      height: 58px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.18);
    }

    .assistly-typing {
      display: inline-flex;
      gap: 4px;
      align-items: center;
    }

    .assistly-typing span {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: rgba(255,255,255,0.7);
      animation: bounce 1.2s infinite;
    }

    .assistly-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .assistly-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }

      40% {
        transform: scale(1);
      }
    }
  `;

  shadow.appendChild(style);

  // =========================
  // Main Container
  // =========================

  const container = document.createElement("div");
  container.className = "assistly-container";

  shadow.appendChild(container);

  // =========================
  // Fetch Bot Settings
  // =========================

  async function fetchBot() {
    try {
      console.log("inside fetchbot")
      const response = await fetch(
        `${API_BASE}/api/bot/get-bot/${botId}`
      );
      console.log(response)

      const data = await response.json();

      console.log(data)
      settings = data.bot?.widgetSettings;

      console.log(settings)
      render();

      if (settings.autoOpen) {
        openWidget();
      }
    } catch (error) {
      console.error("Assistly fetch error:", error);
    }
  }

  // =========================
  // Render Widget
  // =========================

  function render() {
    container.innerHTML = "";

    container.style.right =
      settings.position === "bottom-right" ? "20px" : "auto";

    container.style.left =
      settings.position === "bottom-left" ? "20px" : "auto";

    if (isOpen) {
      const windowEl = createChatWindow();
      container.appendChild(windowEl);
    }

    const launcher = createLauncher();
    container.appendChild(launcher);
  }

  // =========================
  // Launcher Button
  // =========================

  function createLauncher() {
    const button = document.createElement("button");

    button.className = "assistly-launcher";

    button.style.background = settings.primaryColor;

    button.innerHTML = isOpen ? "✕" : "💬";

    button.onclick = () => {
      if (isOpen) {
        closeWidget();
      } else {
        openWidget();
      }
    };

    return button;
  }

  // =========================
  // Open Widget
  // =========================

  function openWidget() {
    createSession();

    isOpen = true;

    messages = [
      {
        role: "assistant",
        content:
          settings.welcomeMessage ||
          "Hi! How can I help you today?",
      },
    ];

    render();
  }

  // =========================
  // Close Widget
  // =========================

  function closeWidget() {
    isOpen = false;
    render();
  }

  // =========================
  // Chat Window
  // =========================

  function createChatWindow() {
    const wrapper = document.createElement("div");

    wrapper.className = "assistly-window";

    wrapper.style.borderRadius = settings.borderRadius;

    // Header
    const header = document.createElement("div");

    header.className = "assistly-header";
    header.style.background = settings.primaryColor;
    header.style.color = settings.textColor;

    const avatar = document.createElement("div");
    avatar.className = "assistly-avatar";

    if (settings.botAvatar) {
      const img = document.createElement("img");
      img.src = settings.botAvatar;
      avatar.appendChild(img);
    } else {
      avatar.innerHTML = "🤖";
    }

    const title = document.createElement("div");
    title.textContent = settings.botName || "Support Bot";

    header.appendChild(avatar);
    header.appendChild(title);

    // Messages
    const messagesEl = document.createElement("div");
    messagesEl.className = "assistly-messages";

    messages.forEach((msg) => {
      const msgEl = document.createElement("div");

      msgEl.className = `assistly-message ${
        msg.role === "assistant"
          ? "assistly-bot"
          : "assistly-user"
      }`;

      if (msg.role === "assistant") {
        msgEl.style.background = settings.primaryColor;
        msgEl.style.color = settings.textColor;
      }

      msgEl.style.borderRadius = settings.borderRadius;

      msgEl.textContent = msg.content;

      messagesEl.appendChild(msgEl);
    });

    // Input Area
    const inputArea = document.createElement("div");
    inputArea.className = "assistly-input-area";

    const input = document.createElement("input");

    input.className = "assistly-input";
    input.placeholder =
      settings.placeholder || "Type a message...";

    const sendBtn = document.createElement("button");

    sendBtn.className = "assistly-send";
    sendBtn.style.background = settings.primaryColor;
    sendBtn.innerHTML = "➜";

    async function sendMessage() {
      const text = input.value.trim();

      if (!text) return;

      messages.push({
        role: "user",
        content: text,
      });

      input.value = "";

      render();

      try {
        messages.push({
          role: "assistant",
          content: "...",
          typing: true,
        });

        render();

        const response = await fetch( `${API_BASE}/api/bot/chat/${botId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: text,
              visitorId,
              sessionId,
              page: window.location.href,
              userAgent: navigator.userAgent,
            }),
          }
        );

        const data = await response.json();

        messages = messages.filter((m) => !m.typing);

      messages.push({
  role: "assistant",
  content:
    data.message ||
    "Sorry, I could not process that.",
});

        render();
      } catch (error) {
        console.error(error);

        messages = messages.filter((m) => !m.typing);

        messages.push({
          role: "assistant",
          content: "Something went wrong.",
        });

        render();
      }
    }

    sendBtn.onclick = sendMessage;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);

    wrapper.appendChild(header);
    wrapper.appendChild(messagesEl);
    wrapper.appendChild(inputArea);

    setTimeout(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 0);

    return wrapper;
  }

  // =========================
  // Initialize
  // =========================

  fetchBot();
 
})();

