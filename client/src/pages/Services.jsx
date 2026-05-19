import React from 'react';
import SharedPage from './SharedPage';
import { Shield, Zap, Search, Activity } from 'lucide-react';

const Services = () => {
  return (
    <SharedPage>
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 border border-brand-green bg-brand-green/10 text-brand-green px-3 py-1.5 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest">Enterprise Solutions</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-mono font-bold mb-6">SERVICES</h1>
        <p className="text-gray-400 max-w-2xl text-lg">Comprehensive vulnerability management and attack surface reduction tailored for hyper-growth startups and Fortune 500 enterprises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Shield className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Continuous Scanning</h3>
          <p className="text-gray-400">Automated integration with your CI/CD pipelines to catch vulnerable packages before they ever reach production. Blocks PRs containing high-risk dependencies.</p>
        </div>
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Zap className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Attack Path Simulation</h3>
          <p className="text-gray-400">Our AI orchestration layer predicts exactly how an adversary will exploit your stack, generating plain-english remediation steps for your engineers.</p>
        </div>
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Search className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Deep SBOM Analysis</h3>
          <p className="text-gray-400">Upload standard CycloneDX or SPDX Software Bill of Materials. We map your transitive dependencies up to 10 levels deep to uncover hidden threats.</p>
        </div>
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 hover:border-brand-green transition group">
          <Activity className="w-12 h-12 text-brand-green mb-6" />
          <h3 className="text-2xl font-bold font-mono mb-4">Zero-Day Monitoring</h3>
          <p className="text-gray-400">24/7 monitoring of the NVD and OSV databases. If a new zero-day affects your mapped stack, we push critical Slack and SMS alerts immediately.</p>
        </div>
      </div>
    </SharedPage>
  );
};

export default Services;
