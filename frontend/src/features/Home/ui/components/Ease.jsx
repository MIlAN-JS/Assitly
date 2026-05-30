import React from 'react';
import { motion } from 'framer-motion';

const Ease = () => {
  // Container variants to coordinate the children's timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each card appearing
        delayChildren: 0.3,
      },
    },
  };

  // Individual element variants
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom "Ease Out" cubic-bezier
      },
    },
  };

  const features = [
    {
      title: "Instant Automated Replies.",
      desc: "Automatically replies to common customer queries in real-time, reducing response time dramatically.",
      icon: <div className="w-10 h-10 border-2 border-slate-800 relative"><div className="absolute inset-1 border border-slate-800 opacity-50" /></div>,
      color: "bg-[#E6F4E8]"
    },
    {
      title: "AI-Powered Agent Suggestions.",
      desc: "AI support helps admins, clinicians, supervisors, and billers complete important tasks in less time.",
      icon: <div className="space-y-1"><div className="h-1 w-8 bg-slate-800" /><div className="h-1 w-8 bg-slate-800" /><div className="h-1 w-5 bg-slate-800" /></div>,
      color: "bg-[#CDE8D2]"
    },
    {
      title: "Multi-Tenant Architecture.",
      desc: "Supports multiple businesses on a single platform with secure and isolated environments.",
      icon: <div className="w-10 h-10 border-b-2 border-l-2 border-slate-800 flex items-end"><div className="h-4 w-4 bg-slate-800" /><div className="h-7 w-4 bg-slate-800 ml-1" /></div>,
      color: "bg-[#B2DBB8]"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Badge & Headline */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="inline-block px-3 py-1 rounded-md bg-[#BCCCDC] text-slate-700 text-sm font-medium mb-6">
            Why Assitly 
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1D3A2F] font-serif leading-tight max-w-2xl">
            A super-powered AI, with a human touch
          </h2>
        </motion.div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${feature.color} rounded-2xl p-8 min-h-[400px] flex flex-col justify-start`}
            >
              <div className="mb-12">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate-700 leading-relaxed text-base">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Ease;