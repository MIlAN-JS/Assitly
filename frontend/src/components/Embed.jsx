import { useState, useRef } from "react";
import { FiCheck, FiCopy, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
  RiRobot2Line,
  RiQuestionLine,
  RiFilePdf2Line,
  RiCodeSSlashLine,
  RiCheckboxCircleLine,
  RiAddLine,
  RiDeleteBinLine,
  RiUploadCloud2Line,
  RiCloseLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
 
const BRAND = "#1A3A2A";
const BRAND_LIGHT = "#F0F5F2";
function StepEmbed({ customBotId }) {
    const embedCode = useSelector(state => state.bot.bot?.customBotId)
   
  const [copied, setCopied] = useState(false);
  const code = `<script src="http://localhost:3000/assistlyWidget.js" botId="${embedCode}"></script>`;

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex items-center justify-center py-40 bg-[#F8F7F3]">
        <div className="space-y-6 max-w-lg border-2 border-[#1a2332] rounded-2xl p-6 ">
      <div>
        <h2 className="text-2xl font-black mb-1" style={{ color: BRAND }}>Embed on your website</h2>
        <p className="text-gray-500 text-sm">Paste this snippet before the closing <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">&lt;/body&gt;</code> tag.</p>
      </div>

      <div className="bg-[#1a2332] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <span className="text-xs text-white/40 font-mono">HTML</span>
          <button
            onClick={copy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
          >
            {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-5 text-sm font-mono text-green-300 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
          {code}
        </pre>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { step: "1", title: "Copy the snippet", desc: "Click the copy button above" },
          { step: "2", title: "Paste in HTML", desc: "Before the closing </body> tag" },
          { step: "3", title: "You're live!", desc: "The widget appears on your site" },
        ].map(s => (
          <div key={s.step} className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ background: BRAND_LIGHT }}>
              <span className="text-sm font-bold" style={{ color: BRAND }}>{s.step}</span>
            </div>
            <p className="text-sm font-bold text-gray-700 mb-1">{s.title}</p>
            <p className="text-xs text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}


export default StepEmbed