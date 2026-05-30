import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PricingPage() {
    const user = useSelector(state => state.auth.user)
  return (
    <div className="min-h-screen bg-[#F4EFE8] text-[#1A3A2A] flex items-center justify-center ">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Pricing</h1>
          <p className="text-[#1A3A2A]/70">
            Simple pricing for everyone. Start free, upgrade later.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <Link
           to = {`${
                user ? "/dashboard" : "/register"
           }`}
          className="bg-white/60 border border-[#1A3A2A]/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Free</h2>
            <p className="text-[#1A3A2A]/70 mb-6">Perfect for testing and small projects</p>
            
            <div className="text-4xl font-bold mb-6">
              $0 <span className="text-sm text-[#1A3A2A]/60">/ month</span>
            </div>

            <ul className="space-y-3 text-sm text-[#1A3A2A]/80 mb-6">
              <li>✓ 1 chatbot widget</li>
              <li>✓ Basic customization</li>
              <li>✓ Visitor tracking</li>
              <li>✓ Session support</li>
              <li>✓ Community support</li>
            </ul>

            <button className="w-full bg-[#1A3A2A] text-white hover:opacity-90 transition rounded-xl py-2 font-medium">
              Current Plan
            </button>
          </Link>

          {/* Locked Pro Placeholder */}
          <div className="bg-white/40 border border-[#1A3A2A]/10 rounded-2xl p-6 opacity-60">
            <h2 className="text-xl font-semibold mb-2">Pro</h2>
            <p className="text-[#1A3A2A]/70 mb-6">Coming soon</p>
            
            <div className="text-4xl font-bold mb-6">
              $19 <span className="text-sm text-[#1A3A2A]/60">/ month</span>
            </div>

            <ul className="space-y-3 text-sm text-[#1A3A2A]/80 mb-6">
              <li>✓ Everything in Free</li>
              <li>✓ AI training on your data</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Custom branding removal</li>
              <li>✓ Priority support</li>
            </ul>

            <button disabled className="w-full bg-[#1A3A2A]/40 text-white cursor-not-allowed rounded-xl py-2 font-medium">
              Coming Soon
            </button>
          </div>

          {/* Enterprise Placeholder */}
          <div className="bg-white/40 border border-[#1A3A2A]/10 rounded-2xl p-6 opacity-60">
            <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
            <p className="text-[#1A3A2A]/70 mb-6">For large scale systems</p>
            
            <div className="text-4xl font-bold mb-6">
              Custom
            </div>

            <ul className="space-y-3 text-sm text-[#1A3A2A]/80 mb-6">
              <li>✓ Everything in Pro</li>
              <li>✓ Dedicated infrastructure</li>
              <li>✓ SLA guarantees</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support engineer</li>
            </ul>

            <button disabled className="w-full bg-[#1A3A2A]/40 text-white cursor-not-allowed rounded-xl py-2 font-medium">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-10 text-[#1A3A2A]/60 text-sm">
          Only Free plan is currently available. Paid plans are coming soon.
        </div>
      </div>
    </div>
  );
}
