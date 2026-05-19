import React from 'react';
import SharedPage from './SharedPage';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <SharedPage>
      <div className="text-center mb-16">
        <h1 className="text-5xl lg:text-7xl font-mono font-bold mb-6">PRICING</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Predictable pricing for engineering teams. Secure your software supply chain without breaking the bank.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Tier */}
        <div className="bg-[#050505] border border-vulnmap-border p-8 flex flex-col">
          <div className="text-gray-400 font-mono mb-4 uppercase tracking-widest">Developer</div>
          <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul className="text-gray-300 space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-2">✓ 5 scans per month</li>
            <li className="flex items-center gap-2">✓ Up to 15 packages</li>
            <li className="flex items-center gap-2 text-gray-500">✕ AI Attack Simulation</li>
            <li className="flex items-center gap-2 text-gray-500">✕ PDF Export</li>
          </ul>
          <Link to="/scan" className="w-full block text-center py-3 border border-vulnmap-border hover:bg-gray-800 transition font-mono">START FREE</Link>
        </div>

        {/* Pro Tier */}
        <div className="bg-[#0a0a0a] border border-brand-green p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <div className="absolute top-0 right-0 bg-brand-green text-black px-3 py-1 font-mono text-xs font-bold">POPULAR</div>
          <div className="text-brand-green font-mono mb-4 uppercase tracking-widest">Professional</div>
          <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-gray-500 font-normal">/seat</span></div>
          <ul className="text-gray-300 space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-2">✓ Unlimited scans</li>
            <li className="flex items-center gap-2">✓ Up to 500 packages</li>
            <li className="flex items-center gap-2 text-white">✓ NVIDIA AI Attack Simulation</li>
            <li className="flex items-center gap-2">✓ PDF Report Export</li>
          </ul>
          <Link to="/scan" className="w-full block text-center py-3 bg-brand-green text-black font-bold hover:bg-green-400 transition font-mono">UPGRADE TO PRO</Link>
        </div>

        {/* Enterprise Tier */}
        <div className="bg-[#050505] border border-vulnmap-border p-8 flex flex-col">
          <div className="text-gray-400 font-mono mb-4 uppercase tracking-widest">Enterprise</div>
          <div className="text-4xl font-bold mb-6">Custom</div>
          <ul className="text-gray-300 space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-2">✓ Unlimited everything</li>
            <li className="flex items-center gap-2">✓ CI/CD Pipeline Integration</li>
            <li className="flex items-center gap-2">✓ Slack / SMS Alerts</li>
            <li className="flex items-center gap-2">✓ Dedicated Support SLA</li>
          </ul>
          <Link to="/contact" className="w-full block text-center py-3 border border-vulnmap-border hover:bg-gray-800 transition font-mono">CONTACT SALES</Link>
        </div>
      </div>
    </SharedPage>
  );
};

export default Pricing;
