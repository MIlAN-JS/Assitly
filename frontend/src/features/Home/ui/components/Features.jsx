import { FaPuzzlePiece, FaUserShield, FaRobot, FaPaintBrush, FaMemory, FaPlug } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FiMessageSquare} from 'react-icons/fi';

const features = [
  {
    icon: <FaPuzzlePiece className="text-3xl text-[#1A3A2A]" />,
    title: "Embeddable Widget",
    description: "Add your chatbot to any website using a single script tag. No setup headaches.",
  },
  {
    icon: <FaUserShield className="text-3xl text-[#1A3A2A]" />,
    title: "Visitor Tracking",
    description: "Track users with persistent visitor IDs and session-based conversations.",
  },
  {
    icon: <FaRobot className="text-3xl text-[#1A3A2A]" />,
    title: "AI-Powered Chat",
    description: "Connect your bot to intelligent responses powered by your backend AI engine.",
  },
  {
    icon: <FaPaintBrush className="text-3xl text-[#1A3A2A]" />,
    title: "Custom Branding",
    description: "Customize colors, position, avatars, and messaging to match your brand.",
  },
  {
    icon: <FaMemory className="text-3xl text-[#1A3A2A]" />,
    title: "Session Memory",
    description: "Maintain conversation context using session-based chat continuity.",
  },
  {
    icon: <FaPlug className="text-3xl text-[#1A3A2A]" />,
    title: "Easy Integration",
    description: "Plug into any stack—React, Next.js, Shopify, WordPress, or plain HTML.",
  },
];

export default function FeaturesPage() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="min-h-screen bg-[#F4EFE8] text-[#1A3A2A] p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Features</h1>
          <p className="text-[#1A3A2A]/70">
            Everything you need to build and deploy intelligent chatbots.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/60 border border-[#1A3A2A]/10 rounded-3xl p-6 shadow-lg hover:scale-105 transform transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-center">{feature.title}</h2>
              <p className="text-sm text-[#1A3A2A]/70 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 px-4">
          <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
          <p className="text-[#1A3A2A]/70 mb-6">
            Launch your first chatbot in minutes.
          </p>
          <div className='flex w-ful items-center justify-center gap-4'>

            <Link to={`${user ? "/dashboard" : "/register"}`} className="bg-[#1A3A2A] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg hover:scale-105">
            Start Free
          </Link>
          <Link
                        to="/demo"
                        className="flex items-center gap-2 text-[#1a3a2a] text-sm font-medium border border-[#1a3a2a]/20 px-7 py-3.5 rounded-lg hover:bg-[#1a3a2a]/5 transition-all duration-200"
                      >
                        <FiMessageSquare size={15} />
                        See it in action
                      </Link>

          </div>
          

        </div>
      </div>
    </div>
  );
}