import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ScrollRevealText from '../components/ScrollRevealText';

// Premium SVG Brand Logos
const OneDriveLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">ONEDRIVE</span>
  </div>
);

const DropboxLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M6 2l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM6 14l6-4 6 4-6 4-6-4zm12-4l6 4-6 4-6-4 6-4zm-6 9.5l-6-4-1.5 1L12 22l7.5-5.5-1.5-1-6 4z" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">DROPBOX</span>
  </div>
);

const MegaLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15V9l4 3 4-3v6" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">MEGA</span>
  </div>
);

const BoxLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">BOX</span>
  </div>
);

const PaypalLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M20.03 7.56c-.34-1.72-1.25-2.88-2.73-3.48C16.1 3.5 14.54 3.5 12.8 3.5H7.5c-.55 0-1 .45-1 1l-2.6 14.5c-.09.52.3 1 1 1h4.2l.9-5.1c.1-.55.58-.9 1.1-.9h2.3c2.9 0 5.1-1.2 5.8-4.6.4-1.8.2-3.1-.7-3.84z" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">PAYPAL</span>
  </div>
);

const WalmartLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-none stroke-current animate-[spin_25s_linear_infinite]" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">WALMART</span>
  </div>
);

const TencentLogo = () => (
  <div className="flex items-center gap-2 hover:text-brand-green transition duration-300">
    <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
    </svg>
    <span className="font-mono text-xs tracking-wider font-bold">TENCENT</span>
  </div>
);

const TerminalDemo = () => {
  const [lines, setLines] = React.useState([]);
  
  React.useEffect(() => {
    const allLogs = [
      { text: "DFX Core initialising...", type: "info" },
      { text: "Establishing secure link to NVD & OSV databases...", type: "info" },
      { text: "Connection verified // status: 200 OK", type: "success" },
      { text: "Analyzing system telemetry...", type: "info" },
      { text: "Ingesting CycloneDX SBOM definition...", type: "info" },
      { text: "Mapping nested trust-chain linkages (Depth 4)...", type: "info" },
      { text: "[WARN] Transitive vulnerability found in nested lodash (v4.17.20) -> CVE-2020-8203", type: "warn" },
      { text: "[ALERT] Threat Vector Discovered: public_gateway → main_api → lodash.merge → RCE", type: "error" },
      { text: "Spawning NVIDIA NIM agent model for attack path simulation...", type: "info" },
      { text: "Simulating 1,200 mock threat actor interactions...", type: "info" },
      { text: "Attack path simulated successfully // 84% probability of containment bypass", type: "error" },
      { text: "Mitigation roadmap generated: Upgrade lodash to version 4.17.21+", type: "success" },
      { text: "Generating board-ready PDF security audit report...", type: "info" },
      { text: "Threat graph compilation complete. Shield online.", type: "success" }
    ];

    let currentIdx = 0;
    setLines([allLogs[0]]);

    const timer = setInterval(() => {
      currentIdx++;
      if (currentIdx < allLogs.length) {
        setLines(prev => [...prev, allLogs[currentIdx]]);
      } else {
        currentIdx = 0;
        setLines([allLogs[0]]);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-vulnmap-border bg-[#030508] p-5 mb-16 text-left font-mono text-[11px] leading-relaxed shadow-2xl rounded-sm w-full relative overflow-hidden">
      {/* Glossy top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-60"></div>
      
      <div className="flex items-center justify-between border-b border-vulnmap-border pb-3 mb-4">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-risk-critical"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-risk-high animate-pulse"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-brand-primary"></span>
        </div>
        <span className="text-[9px] text-gray-500 tracking-widest font-bold">DFX LIVE SIMULATION TERMINAL</span>
      </div>
      <div className="space-y-1.5 h-56 overflow-y-auto custom-scrollbar select-none pr-2">
        {lines.map((line, idx) => {
          let color = "text-gray-400";
          if (line.type === "success") color = "text-brand-primary font-bold";
          if (line.type === "warn") color = "text-risk-high font-bold";
          if (line.type === "error") color = "text-risk-critical font-semibold";
          return (
            <div key={idx} className="flex gap-2 items-start animate-[fadeIn_0.2s_ease-out_forwards]">
              <span className="text-gray-600 select-none">[{new Date().toLocaleTimeString()}]</span>
              <span className={color}>{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
          <div className="animate-marquee gap-24 items-center text-white opacity-100">
            {/* First Set */}
            <OneDriveLogo />
            <DropboxLogo />
            <MegaLogo />
            <BoxLogo />
            <PaypalLogo />
            <WalmartLogo />
            <TencentLogo />
            
            {/* Second Set (Duplicate for seamless scroll) */}
            <OneDriveLogo />
            <DropboxLogo />
            <MegaLogo />
            <BoxLogo />
            <PaypalLogo />
            <WalmartLogo />
            <TencentLogo />
          </div>
        </div>

        {/* Live Attack Path Scanning Terminal Simulator */}
        <TerminalDemo />

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
        <footer className="border-t border-vulnmap-border pt-16 pb-12 mt-12 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-left">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="text-2xl font-bold tracking-widest text-brand-primary mb-4 block">DFX SECURITY</Link>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-6 font-sans">
                Next-generation automated threat intelligence, attack path simulation, and trust-chain depth mapping for modern cloud software architectures.
              </p>
              {/* Telemetry Status Indicator */}
              <div className="inline-flex items-center gap-2 border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                <span className="text-brand-primary font-bold text-[10px] tracking-widest uppercase">ALL SIMULATIONS ONLINE</span>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div>
              <h4 className="text-brand-text font-bold mb-4 uppercase tracking-wider text-[11px] border-b border-vulnmap-border pb-2">Threat Engine</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><Link to="/scan" className="hover:text-brand-primary transition">Dependency Scanner</Link></li>
                <li><Link to="/scan" className="hover:text-brand-primary transition">Attack Simulation</Link></li>
                <li><Link to="/pricing" className="hover:text-brand-primary transition">Enterprise Pricing</Link></li>
                <li><a href="#" className="hover:text-brand-primary transition">CVE Threat Database</a></li>
              </ul>
            </div>

            {/* Column 3: Resources Links */}
            <div>
              <h4 className="text-brand-text font-bold mb-4 uppercase tracking-wider text-[11px] border-b border-vulnmap-border pb-2">Resources</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><Link to="/case-studies" className="hover:text-brand-primary transition">Case Studies</Link></li>
                <li><Link to="/services" className="hover:text-brand-primary transition">Consulting Services</Link></li>
                <li><Link to="/industries" className="hover:text-brand-primary transition">Supported Sectors</Link></li>
                <li><a href="https://github.com/mohit4901/commit_happens_mohit0011" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition">Hackathon Repo</a></li>
              </ul>
            </div>

            {/* Column 4: Compliance/Contact */}
            <div>
              <h4 className="text-brand-text font-bold mb-4 uppercase tracking-wider text-[11px] border-b border-vulnmap-border pb-2">Contact & Audit</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><Link to="/contact" className="hover:text-brand-primary transition">Support Channel</Link></li>
                <li><span className="text-gray-400 select-all cursor-copy">contact@dfxsec.com</span></li>
                <li><span className="text-[10px] text-gray-600 block mt-2">PGP FINGERPRINT:</span></li>
                <li className="text-[9px] text-brand-primary font-bold overflow-hidden text-ellipsis whitespace-nowrap">8F3E A0A2 B9C1 D7F2</li>
              </ul>
            </div>

          </div>

          {/* Bottom Telemetry Bar */}
          <div className="border-t border-vulnmap-border pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-gray-600">
              <span>© {new Date().getFullYear()} DFX SECURITY. ALL RIGHTS RESERVED.</span>
              <span className="hidden md:inline text-vulnmap-border">|</span>
              <span className="hover:text-brand-primary cursor-default">CORE: V2.4.9</span>
              <span className="hidden md:inline text-vulnmap-border">|</span>
              <span className="hover:text-brand-primary cursor-default">LATENCY: 9MS</span>
              <span className="hidden md:inline text-vulnmap-border">|</span>
              <span className="hover:text-brand-primary cursor-default text-brand-primary font-semibold">INTEGRITY: SECURE</span>
            </div>
            
            <div className="flex gap-6 text-[11px]">
              <a href="#" className="hover:text-brand-primary transition">Privacy Protocol</a>
              <a href="#" className="hover:text-brand-primary transition">Audit Terms</a>
              <a href="https://github.com/mohit4901/commit_happens_mohit0011" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition">GitHub</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;
