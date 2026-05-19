import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ScrollRevealText from '../components/ScrollRevealText';

const Landing = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleDemo = () => {
    navigate('/scan', { state: { demoData: true } });
  };

  const cardStyle = {
    backgroundImage: 'radial-gradient(var(--border-main) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
    backgroundColor: 'var(--bg-card)',
  };

  return (
    <div className="min-h-screen bg-vulnmap-dark text-brand-text font-sans flex flex-col items-center">
      <div className="w-full max-w-7xl p-4 lg:p-8">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center py-5 px-6 border border-vulnmap-border mb-6 bg-vulnmap-card">
          <Link to="/" className="text-3xl font-mono tracking-widest font-bold text-brand-green transition">DFX</Link>
          <div className="hidden md:flex gap-8 font-mono text-sm tracking-wider text-gray-500 dark:text-gray-400">
            <Link to="/services" className="hover:text-brand-green transition">Services</Link>
            <Link to="/industries" className="hover:text-brand-green transition">Industries</Link>
            <Link to="/case-studies" className="hover:text-brand-green transition">Case Studies</Link>
            <Link to="/pricing" className="hover:text-brand-green transition">Pricing</Link>
            <Link to="/contact" className="hover:text-brand-green transition">Contact</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 border border-vulnmap-border bg-vulnmap-card text-brand-green hover:bg-brand-green hover:text-white dark:hover:text-black transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button 
              onClick={() => navigate('/scan')}
              className="bg-brand-green text-white dark:text-black px-6 py-2 font-mono font-bold hover:bg-brand-green-hover transition"
            >
              GET A DEMO
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-2 border border-vulnmap-border mb-16 min-h-[600px] relative bg-vulnmap-card">
          
          {/* Left Column */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            
            {/* Threat Intelligence Badge */}
            <div className="inline-flex items-center gap-2 border border-vulnmap-border bg-vulnmap-dark px-3 py-1.5 w-max mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">Supply Chain Threat Intelligence</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-mono font-bold leading-tight mb-8">
              SEE YOUR ATTACK SURFACE BEFORE ATTACKERS DO.
            </h1>

            <p className="max-w-lg mb-10 text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Upload your tech stack. Get a real-time vulnerability graph powered by NVD & OSV databases, complete with AI-simulated attack paths.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/scan')}
                className="bg-brand-green text-white dark:text-black px-8 py-4 font-mono font-bold hover:bg-brand-green-hover transition"
              >
                START FREE SCAN
              </button>
              <button 
                onClick={handleDemo}
                className="border border-vulnmap-border bg-transparent hover:border-brand-green px-8 py-4 font-mono font-bold transition text-brand-text"
              >
                VIEW LIVE DEMO
              </button>
            </div>
          </div>

          {/* Right Column (Fingerprint) */}
          <div className="relative flex items-center justify-center p-8 bg-transparent dark:bg-vulnmap-dark/30 border-l border-vulnmap-border">
            <img 
              src="/fingerprint.png" 
              alt="Digital Fingerprint" 
              className="max-h-[500px] object-contain dark:mix-blend-screen opacity-100 dark:opacity-80 invert dark:invert-0 animate-[pulse_4s_ease-in-out_infinite]"
            />
            
            {/* Trusted By - Absolute positioned at bottom right */}
            <div className="absolute bottom-6 right-8 text-right hidden sm:block">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-3 tracking-widest">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex items-center gap-6 justify-end opacity-70 dark:opacity-60 text-brand-text">
                <span className="font-bold text-xl tracking-tighter">IBM</span>
                <span className="font-bold text-lg">aws</span>
              </div>
            </div>
          </div>
        </main>

        {/* Trusted Partners / Client Logos Bar */}
        <div className="border-y border-vulnmap-border bg-vulnmap-card py-6 mb-16 overflow-hidden relative w-full select-none">
          <div className="animate-marquee gap-24 items-center opacity-65 text-brand-text font-mono text-xs">
            {/* First Set */}
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">OneDrive</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">Dropbox</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">MEGA</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">box</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">PayPal</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">Walmart</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">Tencent</span>
            
            {/* Second Set (Duplicate for seamless scroll) */}
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">OneDrive</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">Dropbox</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">MEGA</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">box</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">PayPal</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">Walmart</span>
            <span className="font-bold tracking-tight mx-4 hover:text-brand-green transition cursor-default uppercase">Tencent</span>
          </div>
        </div>

        {/* Core Value Statement Section */}
        <section className="mb-24 py-12 border-b border-vulnmap-border">
          <p className="text-2xl md:text-3xl lg:text-4xl font-sans leading-relaxed max-w-4xl">
            <ScrollRevealText text="We’ve helped businesses eliminate critical vulnerabilities, respond to breaches in record time, and achieve full regulatory compliance — delivering precise, high-impact security solutions where they matter most." />
          </p>
        </section>

        {/* Key Challenges We Solve Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Case Studies</span>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-brand-text">Key Challenges We Solve.</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border border-vulnmap-border bg-vulnmap-card p-8 flex flex-col justify-between hover:border-gray-400 transition duration-300">
              <div>
                <h4 className="text-lg font-mono font-bold mb-4 text-brand-text">Slow Incident Response</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                  Without rapid containment, attackers can escalate breaches—leading to data loss, financial damage, and reputational harm.
                </p>
              </div>
              <div>
                <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto my-8 opacity-30 dark:opacity-20 stroke-current text-brand-text">
                  <circle cx="50" cy="50" r="40" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="12" ry="40" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="40" ry="24" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="24" ry="40" fill="none" strokeWidth="0.5" />
                  <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
                </svg>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 border border-vulnmap-border bg-transparent hover:border-brand-green font-mono text-xs font-bold text-brand-text transition flex items-center justify-between px-4 uppercase cursor-pointer"
                >
                  <span>Look How We Solve This</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            {/* Card 2 (Highlighted) */}
            <div className="border border-risk-critical bg-vulnmap-card p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] transition duration-300">
              <div>
                <h4 className="text-lg font-mono font-bold mb-4 text-risk-critical">Undetected Vulnerabilities</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                  Automated scans and generic security miss deep, exploitable weaknesses, making your critical assets an easy target.
                </p>
              </div>
              <div>
                <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto my-8 stroke-current text-risk-critical animate-[spin_30s_linear_infinite]">
                  <circle cx="50" cy="50" r="40" fill="none" strokeWidth="0.6" />
                  <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" strokeWidth="0.6" />
                  <ellipse cx="50" cy="50" rx="12" ry="40" fill="none" strokeWidth="0.6" />
                  <ellipse cx="50" cy="50" rx="40" ry="24" fill="none" strokeWidth="0.6" />
                  <ellipse cx="50" cy="50" rx="24" ry="40" fill="none" strokeWidth="0.6" />
                  <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.6" />
                  <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.6" />
                </svg>
                <button 
                  onClick={() => navigate('/scan')}
                  className="w-full py-3 bg-risk-critical text-white font-mono text-xs font-bold transition flex items-center justify-between px-4 uppercase hover:bg-red-700 cursor-pointer"
                >
                  <span>Look How We Solve This</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-vulnmap-border bg-vulnmap-card p-8 flex flex-col justify-between hover:border-gray-400 transition duration-300">
              <div>
                <h4 className="text-lg font-mono font-bold mb-4 text-brand-text">Regulatory Gaps</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                  Incomplete compliance with PCI-DSS, HIPAA, or GDPR can result in audits, legal penalties, and operational shutdowns.
                </p>
              </div>
              <div>
                <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto my-8 opacity-30 dark:opacity-20 stroke-current text-brand-text">
                  <circle cx="50" cy="50" r="40" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="40" ry="12" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="12" ry="40" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="40" ry="24" fill="none" strokeWidth="0.5" />
                  <ellipse cx="50" cy="50" rx="24" ry="40" fill="none" strokeWidth="0.5" />
                  <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
                </svg>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 border border-vulnmap-border bg-transparent hover:border-brand-green font-mono text-xs font-bold text-brand-text transition flex items-center justify-between px-4 uppercase cursor-pointer"
                >
                  <span>Look How We Solve This</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">10s</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Average time to generate a full visual vulnerability graph.</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">100%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Real CVE data fetched live from NVD and OSV databases.</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">AI</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Attack path simulation powered by NVIDIA NIM & Groq.</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">PDF</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Exportable board-ready risk reports in a single click.</div>
          </div>
        </div>

        {/* System Pipeline Diagram Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-mono font-bold mb-4 uppercase">SYSTEM PIPELINE & ARCHITECTURE</h2>
            <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400">See exactly what you input into VulnMap and the security intelligence it produces.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative">
            
            {/* Step 1: Inputs */}
            <div className="border border-vulnmap-border bg-vulnmap-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-brand-green font-mono text-xs uppercase tracking-widest mb-4">STAGE 01 // DECLARED INPUTS</div>
                <h3 className="text-2xl font-bold font-mono mb-4 text-brand-text">TECH STACK INGESTION</h3>
                <p className="text-sm mb-6 text-gray-500 dark:text-gray-400">Ingest your software dependencies, API integrations, and cloud architectures.</p>
                
                <ul className="space-y-3 text-xs font-mono text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    Manual Entry (Libraries, SaaS tools)
                  </li>
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    package.json (Node.js) / requirements.txt (Python)
                  </li>
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    SBOM Upload (CycloneDX / SPDX JSON)
                  </li>
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    Declared SaaS Tools, APIs, & Cloud Services
                  </li>
                </ul>
              </div>
              <div className="text-brand-green text-xs font-mono mt-8 border-t border-vulnmap-border pt-4">
                → FORWARDING METADATA TO PIPELINE
              </div>
            </div>

            {/* Step 2: Engine/Analysis */}
            <div className="border border-brand-green bg-vulnmap-card p-8 flex flex-col justify-between relative shadow-[0_0_30px_rgba(99,102,241,0.08)]">
              <div>
                <div className="text-brand-green font-mono text-xs uppercase tracking-widest mb-4">STAGE 02 // PLATFORM ANALYSIS</div>
                <h3 className="text-2xl font-bold font-mono mb-4 text-brand-text">ANALYSIS ENGINE</h3>
                <p className="text-sm mb-6 text-gray-500 dark:text-gray-400">VulnMap cross-references libraries with live CVE feeds and maps deep nested linkages.</p>
                
                <ul className="space-y-3 text-xs font-mono text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2 border border-brand-green/20 p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                    Real-time CVE Queries (NVD & OSV Databases)
                  </li>
                  <li className="flex items-center gap-2 border border-brand-green/20 p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                    Trust-Chain Depth Mapping
                  </li>
                  <li className="flex items-center gap-2 border border-brand-green/20 p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                    Transitive Relationship Tracking
                  </li>
                  <li className="flex items-center gap-2 border border-brand-green/20 p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                    Overall Risk Scoring & Impact Evaluation
                  </li>
                </ul>
              </div>
              <div className="text-brand-green text-xs font-mono mt-8 border-t border-brand-green/20 pt-4">
                * RUNNING SIMULATION ENGINES
              </div>
            </div>

            {/* Step 3: Outputs */}
            <div className="border border-vulnmap-border bg-vulnmap-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-brand-green font-mono text-xs uppercase tracking-widest mb-4">STAGE 03 // EXPECTED OUTPUTS</div>
                <h3 className="text-2xl font-bold font-mono mb-4 text-brand-text">THREAT DELIVERABLES</h3>
                <p className="text-sm mb-6 text-gray-500 dark:text-gray-400">Generates the visual tools and mitigation roadmaps your security team needs.</p>
                
                <ul className="space-y-3 text-xs font-mono text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    Interactive Dependency Graph (D3.js)
                  </li>
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    CVE Threat Index Overlays
                  </li>
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    AI-Simulated Attack Path Narrative
                  </li>
                  <li className="flex items-center gap-2 border border-vulnmap-border p-3 bg-vulnmap-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                    Exportable Risk Summary Report
                  </li>
                </ul>
              </div>
              <div className="text-brand-green text-xs font-mono mt-8 border-t border-vulnmap-border pt-4">
                ✔ AUDIT COMPLETION REPORT GENERATED
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="border border-vulnmap-border p-12 lg:p-24 text-center mb-12" style={cardStyle}>
          <h2 className="text-4xl lg:text-5xl font-mono font-bold mb-6">READY TO SECURE YOUR CHAIN?</h2>
          <p className="max-w-2xl mx-auto mb-10 text-gray-500 dark:text-gray-400">
            Stop relying on static tables. Start visualizing your vulnerabilities and stay ahead of zero-day exploits.
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="bg-brand-green text-white dark:text-black px-10 py-4 font-mono font-bold hover:bg-brand-green-hover transition text-lg uppercase tracking-widest cursor-pointer"
          >
            Start Your First Scan Now
          </button>
        </section>

        {/* Footer */}
        <footer className="border-t border-vulnmap-border pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-sm font-mono text-gray-400 dark:text-gray-500">
          <div>© {new Date().getFullYear()} DFX Security. Built for the Commit Happens Hackathon.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-green transition">Privacy Policy</a>
            <a href="#" className="hover:text-brand-green transition">Terms of Service</a>
            <a href="https://github.com/mohit4901/commit_happens_mohit0011" target="_blank" rel="noreferrer" className="hover:text-brand-green transition">GitHub</a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;
