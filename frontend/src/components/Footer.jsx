import {
  FaArrowRight,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#e9f6ea] p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT CTA SECTION */}
        <div className="col-span-2 bg-[#e9f6ea] rounded-2xl p-6 md:p-10 flex flex-col justify-between min-h-[300px]">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0b3d1f] leading-tight">
              Automate customer support with AI.
            </h2>

            <p className="mt-6 text-sm md:text-base text-[#1f4d2b] max-w-md">
              Let your website answer customer questions instantly with an embeddable AI chatbot built for modern SaaS teams.
            </p>
          </div>

          <button className="mt-8 flex items-center justify-between bg-[#0b3d1f] text-white px-5 py-4 rounded-xl w-full md:w-[320px] hover:opacity-90 transition">
            <span className="text-sm md:text-base">Start Free Trial</span>
            <FaArrowRight size={18} />
          </button>
        </div>

        {/* RIGHT LINKS SECTION */}
        <div className="bg-[#c7e6c9] rounded-2xl p-6 md:p-8 flex flex-col justify-between">
          
          <div className="grid grid-cols-3 gap-6 text-sm">

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-[#1f4d2b]">
                <li>AI Chatbot</li>
                <li>Embeddable Widget</li>
                <li>Knowledge Base</li>
                <li>Analytics</li>
                <li>API</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-[#1f4d2b]">
                <li>Documentation</li>
                <li>Setup Guide</li>
                <li>Blog</li>
                <li>Case Studies</li>
                <li>Support</li>
              </ul>
            </div>

            {/* Company / Social */}
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-[#1f4d2b]">
                <li>About</li>
                <li>Pricing</li>
                <li>Contact</li>

                <li className="mt-3 font-semibold">Social</li>

                <li className="flex items-center gap-2">
                  <FaInstagram size={14} /> Instagram
                </li>

                <li className="flex items-center gap-2">
                  <FaLinkedin size={14} /> LinkedIn
                </li>

                <li className="flex items-center gap-2">
                  <FaXTwitter size={14} /> X
                </li>

                <li className="flex items-center gap-2">
                  <FaYoutube size={14} /> YouTube
                </li>
              </ul>
            </div>

          </div>

          {/* Decorative block */}
          <div className="mt-6 h-24 rounded-xl bg-gradient-to-r from-[#b7dcbc] to-[#e9f6ea]" />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-6 flex flex-col md:flex-row justify-between text-xs text-[#1f4d2b] gap-2">
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Security</span>
        </div>

        <div>© 2026 Assistly. All rights reserved.</div>
      </div>
    </footer>
  );
}