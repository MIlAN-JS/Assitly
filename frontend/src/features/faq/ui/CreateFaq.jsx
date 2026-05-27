import { useState, useRef } from "react";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiFilePdf2Line,
  RiUploadCloud2Line,
  RiCheckLine,
  RiQuestionLine,
  RiCloseLine,
  RiDraggable,
  RiRobot2Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiSparkling2Line,
} from "react-icons/ri";

import { toast } from "sonner";
import useFaq from "../hook/useFaq";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


// ─── Props expected ────────────────────────────────────────────────────────
// { customBotId, handleCreateFaq, handleCreatePdf }

// ─── Small reusable bits ───────────────────────────────────────────────────
function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-3xl border border-[#D5CFC6] shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="px-7 pt-6 pb-5 border-b border-[#EDE9E3] flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#1E3A2F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon size={18} className="text-[#1E3A2F]" />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#1E3A2F]">{title}</h2>
          <p className="text-sm text-[#9A9289] mt-0.5">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

// ─── FAQ Item ──────────────────────────────────────────────────────────────
function FaqItem({ faq, index, onChange, onRemove, total }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-[#D5CFC6] bg-[#FDFCFB] overflow-hidden transition-all">
      {/* Item header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#EDE9E3]">
        <RiDraggable size={16} className="text-[#C8C2B8] flex-shrink-0 cursor-grab" />
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1E3A2F]/10 flex-shrink-0">
          <span className="text-[11px] font-bold text-[#1E3A2F]">{index + 1}</span>
        </div>
        <span className="flex-1 text-sm font-semibold text-[#1E3A2F] truncate">
          {faq.question.trim() || `Question ${index + 1}`}
        </span>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1 rounded-lg hover:bg-[#EDE9E3] text-[#9A9289] transition-colors"
        >
          {expanded ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
        </button>
        {total > 1 && (
          <button
            onClick={() => onRemove(index)}
            className="p-1 rounded-lg hover:bg-red-50 text-[#C8C2B8] hover:text-red-500 transition-colors"
          >
            <RiDeleteBinLine size={15} />
          </button>
        )}
      </div>

      {/* Inputs */}
      {expanded && (
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#1E3A2F] mb-1.5 uppercase tracking-wide">
              Question
            </label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => onChange(index, "question", e.target.value)}
              placeholder="e.g. What are your business hours?"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5CFC6] bg-white text-[#1E3A2F] text-sm placeholder-[#B0AA9F] focus:outline-none focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1E3A2F] mb-1.5 uppercase tracking-wide">
              Answer
            </label>
            <textarea
              rows={3}
              value={faq.answer}
              onChange={(e) => onChange(index, "answer", e.target.value)}
              placeholder="Provide a clear, helpful answer…"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5CFC6] bg-white text-[#1E3A2F] text-sm placeholder-[#B0AA9F] focus:outline-none focus:border-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F]/10 transition-all resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PDF Upload Zone ───────────────────────────────────────────────────────
function PdfUploadZone({ file, onFile, onRemove }) {
  const fileRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped?.type === "application/pdf") onFile(dropped);
    else toast.error("Only PDF files are accepted.");
  };

  const handlePick = (e) => {
    const picked = e.target.files?.[0];
    if (picked) onFile(picked);
  };

  if (file) {
    return (
      <div className="flex items-center gap-4 p-5 rounded-2xl border border-[#1E3A2F]/30 bg-[#1E3A2F]/5">
        <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
          <RiFilePdf2Line size={24} className="text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#1E3A2F] truncate">{file.name}</p>
          <p className="text-xs text-[#9A9289] mt-0.5">
            {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
          </p>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg hover:bg-red-50 text-[#C8C2B8] hover:text-red-500 transition-colors flex-shrink-0"
        >
          <RiCloseLine size={18} />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileRef.current.click()}
      className={`flex flex-col items-center justify-center gap-3 p-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
        dragging
          ? "border-[#1E3A2F] bg-[#1E3A2F]/5 scale-[1.01]"
          : "border-[#D5CFC6] hover:border-[#1E3A2F] hover:bg-[#F8F6F2]"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
        dragging ? "bg-[#1E3A2F]/15" : "bg-[#EDE9E3]"
      }`}>
        <RiUploadCloud2Line size={26} className="text-[#1E3A2F]" />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-[#1E3A2F]">
          {dragging ? "Drop it here!" : "Drop your PDF here"}
        </p>
        <p className="text-xs text-[#9A9289] mt-1">or click to browse · PDF only · Max 10MB</p>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handlePick}
      />
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────
function EmptyFaqs({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#EDE9E3] flex items-center justify-center mb-4">
        <RiQuestionLine size={26} className="text-[#9A9289]" />
      </div>
      <p className="text-sm font-bold text-[#1E3A2F]">No FAQs yet</p>
      <p className="text-xs text-[#9A9289] mt-1 mb-5">Add common questions your customers ask.</p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3A2F] text-white text-sm font-bold hover:bg-[#16302A] transition-colors"
      >
        <RiAddLine size={16} /> Add First FAQ
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function FaqsPage() {
  // FAQ state
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [faqSaved,   setFaqSaved]   = useState(false);

  // PDF state
  const [pdf,        setPdf]        = useState(null);
  const [pdfSaved,   setPdfSaved]   = useState(false);

  //redux store 
  const businessId= useSelector(state => state.auth.user.id)
console.log(businessId , "is bsid")
const pdfLoading = useSelector(state => state.pdf.pdfLoading)

  // custom hooks 
   const {handleCreateFaq , handleCreatePdf} =useFaq()


  // ── FAQ handlers ──
  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
    setFaqSaved(false);
  };

  const removeFaq = (i) => {
    setFaqs((prev) => prev.filter((_, idx) => idx !== i));
    setFaqSaved(false);
  };

  const changeFaq = (i, field, value) => {
    setFaqs((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: value } : f));
    setFaqSaved(false);
  };

  const submitFaqs = async () => {
    const valid = faqs.filter((f) => f.question.trim() && f.answer.trim());
    if (!valid.length) {
      toast.error("Please fill in at least one FAQ.");
      return;
    }
    if (valid.length < faqs.length) {
      toast.error("Some FAQs are incomplete and will be skipped.");
    }
    handleCreateFaq({businessId , faqs: valid})


    setFaqLoading(true);
    try {
    //   await handleCreateFaq({ customBotId, faqs: valid });
console.log(valid)
      setFaqSaved(true);
    } finally {
      setFaqLoading(false);
    }
  };

  // ── PDF handlers ──
  const submitPdf = async () => {
    if (!pdf) { toast.error("Please upload a PDF first."); return; }
    
 
    await handleCreatePdf({businessId , pdf})
      setPdfSaved(true);
   
  };

  const handleSubmit = async () => {
    faqs.length>0 && await submitFaqs();
    pdf && await submitPdf();

  };

  const filledCount = faqs.filter((f) => f.question.trim() && f.answer.trim()).length;

  return (
    <div className="min-h-screen bg-[#EDE9E3] py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-xl bg-[#1E3A2F] flex items-center justify-center">
          <RiRobot2Line size={20} className="text-white" />
        </div>
        <span className="text-2xl font-black text-[#1E3A2F] tracking-tight">Assistly</span>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Page title */}
        <div className="mb-2">
          <h1 className="text-3xl font-black text-[#1E3A2F]">Train Your Bot</h1>
          <p className="text-[#9A9289] mt-1">Add FAQs or upload a PDF to help your bot answer better.</p>
        </div>

        {/* ── FAQ Section ── */}
        <SectionCard>
          <SectionHeader
            icon={RiQuestionLine}
            title="Frequently Asked Questions"
            subtitle="These will be used to train your bot with accurate answers."
            action={
              <button
                onClick={addFaq}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3A2F] text-white text-sm font-bold hover:bg-[#16302A] transition-colors flex-shrink-0"
              >
                <RiAddLine size={15} /> Add FAQ
              </button>
            }
          />

          <div className="p-6 space-y-3">
            {faqs.length === 0 ? (
              <EmptyFaqs onAdd={addFaq} />
            ) : (
              faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  faq={faq}
                  index={i}
                  total={faqs.length}
                  onChange={changeFaq}
                  onRemove={removeFaq}
                />
              ))
            )}
          </div>

          {/* FAQ footer */}
          {faqs.length > 0 && (
            <div className="px-6 pb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#9A9289]">
                <RiSparkling2Line size={14} className="text-[#1E3A2F]" />
                <span>
                  <span className="font-bold text-[#1E3A2F]">{filledCount}</span> of {faqs.length} complete
                </span>
              </div>
              {/* <button
                onClick={submitFaqs}
                disabled={faqLoading || faqSaved}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                  faqSaved
                    ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                    : "bg-[#1E3A2F] text-white hover:bg-[#16302A] disabled:opacity-60 disabled:cursor-not-allowed"
                }`}
              >
                {faqLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving…
                  </>
                ) : faqSaved ? (
                  <><RiCheckLine size={16} /> Saved!</>
                ) : (
                  <>Save FAQs <RiCheckLine size={15} /></>
                )}
              </button> */}
            </div>
          )}
        </SectionCard>

        {/* ── PDF Section ── */}
        <SectionCard>
          <SectionHeader
            icon={RiFilePdf2Line}
            title="Upload Business PDF"
            subtitle="Upload a PDF (catalog, manual, policy doc) to give your bot more context."
          />

          <div className="p-6 space-y-4">
            <PdfUploadZone
              file={pdf}
              onFile={(f) => { setPdf(f); setPdfSaved(false); }}
              onRemove={() => { setPdf(null); setPdfSaved(false); }}
            />

            {/* Info chips */}
            <div className="flex flex-wrap gap-2">
              {["PDF only", "1 file max", "Up to 10MB", "Processed securely"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#EDE9E3] text-xs font-semibold text-[#6B6560]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-6 pb-6 flex justify-end">
            {/* <button
              onClick={submitPdf}
              disabled={!pdf || pdfLoading || pdfSaved}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                pdfSaved
                  ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                  : "bg-[#1E3A2F] text-white hover:bg-[#16302A] disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {pdfLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Uploading…
                </>
              ) : pdfSaved ? (
                <><RiCheckLine size={16} /> Uploaded!</>
              ) : (
                <><RiUploadCloud2Line size={16} /> Upload PDF</>
              )}
            </button> */}
          </div>
        </SectionCard>

        <div className=" flex items-center justify-center ">
            <Link
            to="/dashboard"
            onClick={()=>{
                handleSubmit()
            }}
            className="bg-[#1F392F] text-white py-4 px-6  rounded-lg">
          Save Data

        </Link>
        </div>

        <p className="text-center text-xs text-[#9A9289] pb-4">
          Need help?{" "}
          <span className="font-bold text-[#1E3A2F] cursor-pointer hover:underline">
            Contact support
          </span>
        </p>
      </div>
    </div>
  );
}