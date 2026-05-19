import React from 'react';
import SharedPage from './SharedPage';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies = () => {
  return (
    <SharedPage>
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 border border-brand-green bg-brand-green/10 text-brand-green px-3 py-1.5 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest">Real Results</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-mono font-bold mb-6">CASE STUDIES</h1>
        <p className="text-gray-400 max-w-2xl text-lg">Read how leading organizations leverage DFX VulnMap to secure their supply chain and mitigate critical vulnerabilities.</p>
      </div>

      <div className="space-y-8">
        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-brand-green transition group">
          <div>
            <div className="text-brand-green font-mono text-sm mb-2">NEOBANK CASE STUDY</div>
            <h3 className="text-2xl font-bold font-mono mb-4">Securing the Core Transaction System</h3>
            <p className="text-gray-400 max-w-2xl">A major neobank used VulnMap to scan their microservices. The tool uncovered a nested prototype pollution vulnerability in an old version of `lodash` that had bypassed three other security scanners. AI attack path simulation saved their DevSecOps team weeks of work.</p>
          </div>
          <a href="#" className="border border-vulnmap-border p-3 text-white hover:bg-brand-green hover:text-black transition mt-6 md:mt-0 flex items-center gap-2 font-mono">
            READ CASE <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-[#0a0a0a] border border-vulnmap-border p-10 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-brand-green transition group">
          <div>
            <div className="text-brand-green font-mono text-sm mb-2">SAAS PLATFORM CASE STUDY</div>
            <h3 className="text-2xl font-bold font-mono mb-4">Mitigating Log4Shell in Under 4 Hours</h3>
            <p className="text-gray-400 max-w-2xl">During the December 2021 Log4j emergency, a B2B SaaS platform used VulnMap to map and verify all internal environments. Through real-time graph visualization, the security team patched every single exposed Java service before attackers could attempt exploitation.</p>
          </div>
          <a href="#" className="border border-vulnmap-border p-3 text-white hover:bg-brand-green hover:text-black transition mt-6 md:mt-0 flex items-center gap-2 font-mono">
            READ CASE <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </SharedPage>
  );
};

export default CaseStudies;
