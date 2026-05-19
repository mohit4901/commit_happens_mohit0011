import React from 'react';
import SharedPage from './SharedPage';
import { Landmark, ShieldAlert, Cpu, Heart } from 'lucide-react';

const Industries = () => {
  return (
    <SharedPage>
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 border border-brand-green bg-brand-green/10 text-brand-green px-3 py-1.5 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest">Sectors We Protect</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-mono font-bold mb-6">INDUSTRIES</h1>
        <p className="text-gray-400 max-w-2xl text-lg">Custom attack surface management solutions for industries operating under strict regulatory compliance and high-risk threat profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Landmark className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Fintech & Banking</h3>
          <p className="text-gray-400">Strict compliance with PCI-DSS and SOC2. We map out financial transaction pipelines, checking for critical security holes in crypto libraries, payment gateways, and banking APIs.</p>
        </div>
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <ShieldAlert className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Defense & GovTech</h3>
          <p className="text-gray-400">Securing federal supply chains. We audit critical dependency trees for public sector systems to prevent nation-state software supply chain attacks.</p>
        </div>
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Cpu className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">SaaS Platforms</h3>
          <p className="text-gray-400">Protecting cloud environments. We scan modern Javascript/Python stacks to ensure zero-day vulnerabilities in common libraries do not allow cross-tenant data leaks.</p>
        </div>
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Heart className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Healthcare</h3>
          <p className="text-gray-400">HIPAA compliant dependency checks. We ensure medical record systems and patient monitoring APIs are clear of vulnerable modules to prevent ransomware attacks.</p>
        </div>
      </div>
    </SharedPage>
  );
};

export default Industries;
