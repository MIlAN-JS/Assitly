import { useState, useRef } from "react";
import {
  RiRobot2Line,
  RiPaletteLine,
  RiSettings4Line,
  RiArrowRightLine,
  RiUploadCloud2Line,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiArrowLeftLine,
  RiMessage3Line,
  RiLayoutBottomLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import useBot from "../hook/useBot";
import { useNavigate } from "react-router-dom";

// ─── helpers ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Identity",  icon: RiRobot2Line },
  { id: 2, label: "Appearance", icon: RiPaletteLine },
  { id: 3, label: "Behaviour",  icon: RiSettings4Line },
];

const DEFAULT_FORM = {
  systemPrompt:   "Act as a customer support agent. Be helpful, friendly, and concise.",
  widgetSettings: {
    primaryColor:   "#1E3A2F",
    textColor:      "#ffffff",
    position:       "bottom-right",
    borderRadius:   "12px",
    botName:        "Support Bot",
    botAvatar:      null,
    welcomeMessage: "Hi! How can I help you today?",
    placeholder:    "Type a message...",
    autoOpen:       false,
  },
};

// ─── sub-components ──────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <label className="block text-sm font-bold text-[#1E3A2F] mb-1.5">
      {children}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-2xl border border-[#D5CFC6] bg-white text-[#1E3A2F] placeholder-[#A09A90] focus:outline-none focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/10 transition-all text-base ${className}`}
      {...props}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-2xl border border-[#D5CFC6] bg-white text-[#1E3A2F] placeholder-[#A09A90] focus:outline-none focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/10 transition-all text-base resize-none ${className}`}
      {...props}
    />
  );
}

// ─── Live Widget Preview ─────────────────────────────────────────────────────
function WidgetPreview({ settings }) {
  const [open, setOpen] = useState(true);
  const isRight = settings.position === "bottom-right";
  const br = settings.borderRadius;

  return (
    <div className="relative w-full h-[360px] bg-[#F0EDE8] rounded-2xl border border-[#D5CFC6] overflow-hidden">
      {/* mock page bg */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-3 bg-[#C8C2B8] rounded-full mx-6 mb-3 mt-2" style={{ width: `${60 + Math.random() * 30}%` }} />
        ))}
      </div>

      <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#9A9289] tracking-widest uppercase">Live Preview</span>

      {/* chat window */}
      {open && (
        <div
          className="absolute bottom-14 w-56 shadow-2xl flex flex-col overflow-hidden"
          style={{
            [isRight ? "right" : "left"]: "12px",
            borderRadius: br,
            background: "#fff",
          }}
        >
          {/* header */}
          <div
            className="px-3 py-2.5 flex items-center gap-2"
            style={{ background: settings.primaryColor, borderRadius: `${br} ${br} 0 0` }}
          >
            {settings.botAvatar ? (
              <img src={settings.botAvatar} className="w-6 h-6 rounded-full object-cover" alt="avatar" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <RiRobot2Line size={13} style={{ color: settings.textColor }} />
              </div>
            )}
            <span className="text-xs font-bold truncate" style={{ color: settings.textColor }}>
              {settings.botName || "Support Bot"}
            </span>
          </div>

          {/* messages */}
          <div className="p-2.5 flex flex-col gap-2 bg-[#F8F6F2] flex-1">
            <div
              className="self-start text-[10px] px-2.5 py-1.5 rounded-2xl max-w-[85%]"
              style={{ background: settings.primaryColor, color: settings.textColor, borderRadius: `4px ${br} ${br} ${br}` }}
            >
              {settings.welcomeMessage || "Hi! How can I help?"}
            </div>
            <div
              className="self-end text-[10px] px-2.5 py-1.5 rounded-2xl max-w-[85%] bg-white border border-[#E0DBD4] text-[#1E3A2F]"
              style={{ borderRadius: `${br} 4px ${br} ${br}` }}
            >
              I need help with my order.
            </div>
          </div>

          {/* input */}
          <div className="px-2 py-2 border-t border-[#E8E4DE] flex items-center gap-1.5">
            <div className="flex-1 text-[9px] text-[#A09A90] bg-[#F8F6F2] rounded-xl px-2 py-1.5 truncate">
              {settings.placeholder}
            </div>
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: settings.primaryColor }}
            >
              <RiArrowRightLine size={10} style={{ color: settings.textColor }} />
            </div>
          </div>
        </div>
      )}

      {/* launcher bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="absolute bottom-3 w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{
          [isRight ? "right" : "left"]: "12px",
          background: settings.primaryColor,
        }}
      >
        <RiMessage3Line size={16} style={{ color: settings.textColor }} />
      </button>
    </div>
  );
}

// ─── Step 1: Identity ────────────────────────────────────────────────────────
function StepIdentity({ form, onChange }) {
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange("image", file);
    const url = URL.createObjectURL(file);
    onChange("widgetSettings.botAvatar", url);
  };

  return (
    <div className="space-y-5">
      <div>
        <Label>Bot Name</Label>
        <Input
          placeholder="e.g. Support Bot"
          value={form.widgetSettings.botName}
          onChange={(e) => onChange("widgetSettings.botName", e.target.value)}
        />
      </div>

      <div>
        <Label>Bot Avatar</Label>
        <div
          onClick={() => fileRef.current.click()}
          className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-[#D5CFC6] hover:border-[#1E3A2F] cursor-pointer transition-colors bg-white group"
        >
          {form.widgetSettings.botAvatar ? (
            <img src={form.widgetSettings.botAvatar} className="w-14 h-14 rounded-full object-cover ring-2 ring-[#1E3A2F]/20" alt="avatar preview" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#EDE9E3] flex items-center justify-center group-hover:bg-[#1E3A2F]/10 transition-colors">
              <RiUploadCloud2Line size={22} className="text-[#9A9289]" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-[#1E3A2F]">
              {form.widgetSettings.botAvatar ? "Change avatar" : "Upload avatar"}
            </p>
            <p className="text-xs text-[#9A9289] mt-0.5">PNG, JPG up to 2MB</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </div>
      </div>

      <div>
        <Label>Welcome Message</Label>
        <Input
          placeholder="Hi! How can I help you today?"
          value={form.widgetSettings.welcomeMessage}
          onChange={(e) => onChange("widgetSettings.welcomeMessage", e.target.value)}
        />
      </div>

      <div>
        <Label>System Prompt</Label>
        <Textarea
          rows={5}
          placeholder="Describe how your bot should behave..."
          value={form.systemPrompt}
          onChange={(e) => onChange("systemPrompt", e.target.value)}
        />
        <p className="text-xs text-[#9A9289] mt-1.5">
          Instruct your bot's personality, tone, and scope.
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Appearance ──────────────────────────────────────────────────────
function StepAppearance({ form, onChange }) {
  const colors = ["#1E3A2F", "#2563EB", "#7C3AED", "#DC2626", "#D97706", "#059669", "#0891B2", "#DB2777"];

  return (
    <div className="space-y-5">
      <div>
        <Label>Primary Color</Label>
        <div className="flex items-center gap-3 flex-wrap">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => onChange("widgetSettings.primaryColor", c)}
              className="w-8 h-8 rounded-full ring-offset-2 transition-all hover:scale-110"
              style={{
                background: c,
                ringColor: c,
                outline: form.widgetSettings.primaryColor === c ? `3px solid ${c}` : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
          <div className="flex items-center gap-2 ml-1">
            <input
              type="color"
              value={form.widgetSettings.primaryColor}
              onChange={(e) => onChange("widgetSettings.primaryColor", e.target.value)}
              className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent p-0"
              title="Custom color"
            />
            <span className="text-xs text-[#9A9289]">Custom</span>
          </div>
        </div>
      </div>

      <div>
        <Label>Text Color</Label>
        <div className="flex items-center gap-3">
          {["#ffffff", "#000000", "#1E3A2F"].map((c) => (
            <button
              key={c}
              onClick={() => onChange("widgetSettings.textColor", c)}
              className="w-8 h-8 rounded-full border border-[#D5CFC6] transition-all hover:scale-110"
              style={{
                background: c,
                outline: form.widgetSettings.textColor === c ? `3px solid #1E3A2F` : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Border Radius</Label>
        <div className="flex gap-3">
          {[{ label: "Rounded", value: "12px" }, { label: "Pill", value: "24px" }, { label: "Sharp", value: "4px" }].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange("widgetSettings.borderRadius", opt.value)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-2xl border transition-all ${
                form.widgetSettings.borderRadius === opt.value
                  ? "bg-[#1E3A2F] text-white border-[#1E3A2F]"
                  : "bg-white text-[#1E3A2F] border-[#D5CFC6] hover:border-[#1E3A2F]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Position</Label>
        <div className="flex gap-3">
          {[
            { label: "Bottom Right", value: "bottom-right", icon: RiLayoutBottomLine },
            { label: "Bottom Left",  value: "bottom-left",  icon: RiLayoutBottomLine },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange("widgetSettings.position", opt.value)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-2xl border transition-all ${
                form.widgetSettings.position === opt.value
                  ? "bg-[#1E3A2F] text-white border-[#1E3A2F]"
                  : "bg-white text-[#1E3A2F] border-[#D5CFC6] hover:border-[#1E3A2F]"
              }`}
            >
              <opt.icon size={16} style={{ transform: opt.value === "bottom-left" ? "scaleX(-1)" : "none" }} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Behaviour ───────────────────────────────────────────────────────
function StepBehaviour({ form, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Input Placeholder</Label>
        <Input
          placeholder="Type a message..."
          value={form.widgetSettings.placeholder}
          onChange={(e) => onChange("widgetSettings.placeholder", e.target.value)}
        />
      </div>

      <div>
        <Label>Auto Open</Label>
        <div
          onClick={() => onChange("widgetSettings.autoOpen", !form.widgetSettings.autoOpen)}
          className={`relative flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
            form.widgetSettings.autoOpen
              ? "border-[#1E3A2F] bg-[#1E3A2F]/5"
              : "border-[#D5CFC6] bg-white hover:border-[#1E3A2F]"
          }`}
        >
          <div>
            <p className="text-sm font-semibold text-[#1E3A2F]">Auto open chat widget</p>
            <p className="text-xs text-[#9A9289] mt-0.5">Widget opens automatically when page loads</p>
          </div>
          <div
            className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
              form.widgetSettings.autoOpen ? "bg-[#1E3A2F]" : "bg-[#D5CFC6]"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                form.widgetSettings.autoOpen ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-[#D5CFC6] bg-[#F8F6F2] p-4 space-y-2">
        <p className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-3">Configuration Summary</p>
        {[
          ["Bot Name",        form.widgetSettings.botName || "Support Bot"],
          ["Position",        form.widgetSettings.position],
          ["Border Radius",   form.widgetSettings.borderRadius],
          ["Auto Open",       form.widgetSettings.autoOpen ? "Yes" : "No"],
          ["Primary Color",   form.widgetSettings.primaryColor],
        ].map(([key, val]) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="text-[#9A9289]">{key}</span>
            <span className="font-semibold text-[#1E3A2F] flex items-center gap-1.5">
              {key === "Primary Color" && (
                <span className="w-3.5 h-3.5 rounded-full inline-block border border-white shadow" style={{ background: val }} />
              )}
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CreateBotPage() {
  const [step,    setStep]    = useState(1);

  const loading = useSelector((state) => state.bot.loading);
  const {handleCreateBot} = useBot()
const navigate = useNavigate()
  console.log(loading)

  const [form, setForm] = useState({
    ...DEFAULT_FORM,
    image: null,
  });

  // nested dot-path setter: "widgetSettings.botName" or "systemPrompt"
  const onChange = (path, value) => {
    setForm((prev) => {
      const keys  = path.split(".");
      if (keys.length === 1) return { ...prev, [path]: value };
      return {
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const { image, systemPrompt, widgetSettings } = form;
      handleCreateBot({widgetSettings, image, systemPrompt});
     navigate("/create-faq")
    } catch(error) {
      console.log(error)
    }
  };

  

  return (
    <div className="min-h-screen bg-[#EDE9E3] py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-xl bg-[#1E3A2F] flex items-center justify-center">
          <RiRobot2Line size={20} className="text-white" />
        </div>
        <span className="text-2xl font-black text-[#1E3A2F] tracking-tight">Assistly</span>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => {
            const Icon    = s.icon;
            const active  = step === s.id;
            const done    = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  active ? "bg-[#1E3A2F] text-white shadow-md" :
                  done   ? "bg-[#1E3A2F]/15 text-[#1E3A2F]" :
                           "bg-white text-[#9A9289] border border-[#D5CFC6]"
                }`}>
                  {done ? <RiCheckLine size={15} /> : <Icon size={15} />}
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.id}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 rounded-full transition-colors ${step > s.id ? "bg-[#1E3A2F]" : "bg-[#D5CFC6]"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form card */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-[#D5CFC6] shadow-sm overflow-hidden">
            <div className="px-7 pt-7 pb-5 border-b border-[#EDE9E3]">
              <h1 className="text-2xl font-black text-[#1E3A2F]">
                {step === 1 ? "Bot Identity" : step === 2 ? "Appearance" : "Behaviour"}
              </h1>
              <p className="text-[#9A9289] text-sm mt-1">
                {step === 1 ? "Give your bot a name and personality." :
                 step === 2 ? "Customize how the widget looks." :
                              "Configure how the widget behaves."}
              </p>
            </div>

            <div className="px-7 py-6">
              {step === 1 && <StepIdentity form={form} onChange={onChange} />}
              {step === 2 && <StepAppearance form={form} onChange={onChange} />}
              {step === 3 && <StepBehaviour form={form} onChange={onChange} />}
            </div>

            {/* Navigation */}
            <div className="px-7 pb-7 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#D5CFC6] text-sm font-bold text-[#1E3A2F] hover:border-[#1E3A2F] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <RiArrowLeftLine size={16} /> Back
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1E3A2F] text-white text-sm font-bold hover:bg-[#16302A] transition-colors"
                >
                  Continue <RiArrowRightLine size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1E3A2F] text-white text-sm font-bold hover:bg-[#16302A] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Creating…
                    </>
                  ) : (
                    <>Create Bot <RiCheckLine size={16} /></>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-[#D5CFC6] shadow-sm p-5">
              <p className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-4">Widget Preview</p>
              <WidgetPreview settings={form.widgetSettings} />
              <p className="text-xs text-[#9A9289] text-center mt-3">Click the chat bubble to toggle</p>
            </div>

            {/* Step progress hint */}
            <div className="bg-white rounded-3xl border border-[#D5CFC6] shadow-sm p-5">
              <p className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-3">Progress</p>
              <div className="w-full bg-[#EDE9E3] rounded-full h-2">
                <div
                  className="bg-[#1E3A2F] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#9A9289] mt-2">Step {step} of 3</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#9A9289] mt-8">
          Need help? <span className="font-bold text-[#1E3A2F] cursor-pointer hover:underline">Contact support</span>
        </p>
      </div>
    </div>
  );
}