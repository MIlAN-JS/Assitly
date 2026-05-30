import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const centerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function CaseStudySection() {
  return (
    <section className="w-full bg-[#F6F7F5] py-24 px-6 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
      >
        {/* LEFT */}
        <motion.div
          variants={leftVariants}
          className="h-full bg-white rounded-2xl shadow-sm p-8 border border-black/5"
        >
          <p className="text-lg leading-relaxed text-gray-700">
            “Our support workload dropped dramatically after integrating the AI chatbot.
            It now handles repetitive queries, letting our team focus on high-impact issues.”
          </p>

          <div className="mt-6">
            <p className="text-[#1B4332] font-semibold">Sarah Mitchell</p>
            <p className="text-sm text-gray-500">
              Head of Customer Experience · NovaSaaS
            </p>
          </div>
        </motion.div>

        {/* CENTER */}
        <motion.div
          variants={centerVariants}
          className="h-full bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex items-center justify-center"
        >
          <div className="h-full w-full p-6 flex flex-col justify-center">
            <div className="flex-1 rounded-xl bg-gradient-to-br from-[#1B4332]/10 to-white flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#1B4332] mb-4" />
              <h3 className="text-[#1B4332] font-semibold text-lg">
                AI Chatbot Embedded
              </h3>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Instantly responds inside your website UI with full context awareness.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={rightVariants}
          className="h-full flex flex-col justify-between gap-6"
        >
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-black/5">
            <p className="text-[#1B4332] text-2xl font-semibold">2.3s</p>
            <p className="text-gray-600 text-sm mt-1">
              Average AI response time
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-black/5">
            <p className="text-[#1B4332] text-2xl font-semibold">68%</p>
            <p className="text-gray-600 text-sm mt-1">
              Reduction in support tickets
            </p>
          </div>

          <div className="bg-[#1B4332] text-white rounded-2xl shadow-sm p-6 cursor-pointer group">
            <p className="text-lg font-semibold">Install in 5 minutes</p>

            <p className="text-sm mt-2 flex items-center gap-2">
              Read documentation
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}