import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleDemo = () => {
    navigate('/scan', { state: { demoData: true } });
  };

  const cardStyle = {
    backgroundImage: 'radial-gradient(rgba(0, 255, 65, 0.2) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
    backgroundColor: 'rgba(0, 255, 65, 0.02)',
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center">
      <div className="w-full max-w-7xl p-4 lg:p-8">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center py-5 px-6 border border-vulnmap-border mb-6">
          <Link to="/" className="text-3xl font-mono tracking-widest font-bold hover:text-brand-green transition">DFX</Link>
          <div className="hidden md:flex gap-8 font-mono text-sm text-gray-300 tracking-wider">
            <Link to="/services" className="hover:text-brand-green transition">Services</Link>
            <Link to="/industries" className="hover:text-brand-green transition">Industries</Link>
            <Link to="/case-studies" className="hover:text-brand-green transition">Case Studies</Link>
            <Link to="/pricing" className="hover:text-brand-green transition">Pricing</Link>
            <Link to="/contact" className="hover:text-brand-green transition">Contact</Link>
          </div>
          <button 
            onClick={handleDemo}
            className="bg-brand-green text-black px-6 py-2 font-mono font-bold hover:bg-green-400 transition"
          >
            GET A DEMO
          </button>
        </nav>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-2 border border-vulnmap-border mb-16 min-h-[600px] relative">
          
          {/* Left Column */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            
            {/* Problem Statement 3 Hackathon Banner */}
            <div className="border border-brand-green/30 bg-brand-green/5 p-5 mb-8 font-mono text-xs text-brand-green flex flex-col gap-2 rounded-sm max-w-xl">
              <div className="font-bold uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-green" /> HACKATHON TRACK: PROBLEM STATEMENT 3
              </div>
              <div className="text-gray-300 font-sans text-sm mt-1">
                <strong>Cybersecurity Enterprise Web Tool</strong> — Supply Chain Vulnerability Visualizer
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 text-gray-400 text-[11px]">
                <div className="flex items-center gap-1.5">✓ Manual & JSON/SBOM Upload</div>
                <div className="flex items-center gap-1.5">✓ Trust-Chain Depth Mapping</div>
                <div className="flex items-center gap-1.5">✓ Public CVE Overlay (NVD/OSV)</div>
                <div className="flex items-center gap-1.5">✓ Exportable Risk Reports</div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-mono font-bold leading-tight mb-8">
              SEE YOUR ATTACK SURFACE BEFORE ATTACKERS DO.
            </h1>

            <p className="text-gray-400 max-w-lg mb-10 text-base leading-relaxed">
              Upload your tech stack. Get a real-time vulnerability graph powered by NVD & OSV databases, complete with AI-simulated attack paths.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleDemo}
                className="bg-brand-green text-black px-8 py-4 font-mono font-bold hover:bg-green-400 transition"
              >
                START FREE SCAN
              </button>
              <button 
                onClick={handleDemo}
                className="border border-vulnmap-border bg-transparent text-white px-8 py-4 font-mono font-bold hover:border-brand-green transition"
              >
                VIEW LIVE DEMO
              </button>
            </div>
          </div>

          {/* Right Column (Fingerprint) */}
          <div className="relative flex items-center justify-center p-8 bg-[#0a0a0a] border-l border-vulnmap-border">
            <img 
              src="/fingerprint.png" 
              alt="Digital Fingerprint" 
              className="max-h-[500px] object-contain mix-blend-screen opacity-90 animate-[pulse_4s_ease-in-out_infinite]"
            />
            
            {/* Trusted By - Absolute positioned at bottom right */}
            <div className="absolute bottom-6 right-8 text-right hidden sm:block">
              <p className="text-[10px] text-gray-500 font-bold mb-3 tracking-widest">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex items-center gap-6 justify-end opacity-70">
                <span className="font-bold text-xl tracking-tighter">IBM</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 22h20L12 2z"/></svg>
                <span className="font-bold text-lg">aws</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </div>
            </div>
          </div>
        </main>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">10s</div>
            <div className="text-sm text-gray-400">Average time to generate a full visual vulnerability graph.</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">100%</div>
            <div className="text-sm text-gray-400">Real CVE data fetched live from NVD and OSV databases.</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">AI</div>
            <div className="text-sm text-gray-400">Attack path simulation powered by NVIDIA NIM & Groq.</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2 text-brand-green">PDF</div>
            <div className="text-sm text-gray-400">Exportable board-ready risk reports in a single click.</div>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-mono font-bold mb-4 uppercase">How DFX VulnMap Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From a simple JSON upload to a comprehensive, CISO-ready security brief in three steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-[#0a0a0a] border border-vulnmap-border p-8 relative z-10">
              <div className="text-brand-green font-mono text-xl mb-4">01. INGEST</div>
              <h3 className="text-2xl font-bold mb-4">Upload Stack</h3>
              <p className="text-gray-400">Drag and drop your <code className="bg-vulnmap-dark px-1 text-white">package.json</code> or standard SBOM. We parse dependencies and map the trust chain instantly.</p>
            </div>
            
            <div className="bg-[#0a0a0a] border border-vulnmap-border p-8 relative z-10">
              <div className="text-brand-green font-mono text-xl mb-4">02. ANALYZE</div>
              <h3 className="text-2xl font-bold mb-4">Live CVE Fetch</h3>
              <p className="text-gray-400">We hit NVD and OSV government databases in real-time, pulling CVSS scores and mapping them to a D3.js force graph.</p>
            </div>

            <div className="bg-[#0a0a0a] border border-vulnmap-border p-8 relative z-10">
              <div className="text-brand-green font-mono text-xl mb-4">03. SIMULATE</div>
              <h3 className="text-2xl font-bold mb-4">AI Attack Paths</h3>
              <p className="text-gray-400">Our multi-model AI (NVIDIA NIM) generates plain-English narratives showing exactly how an attacker would exploit your stack.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="border border-vulnmap-border bg-[#0a0a0a] p-12 lg:p-24 text-center mb-12" style={cardStyle}>
          <h2 className="text-4xl lg:text-5xl font-mono font-bold mb-6">READY TO SECURE YOUR CHAIN?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Stop relying on static tables. Start visualizing your vulnerabilities and stay ahead of zero-day exploits.
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="bg-brand-green text-black px-10 py-4 font-mono font-bold hover:bg-green-400 transition text-lg uppercase tracking-widest"
          >
            Start Your First Scan Now
          </button>
        </section>

        {/* Footer */}
        <footer className="border-t border-vulnmap-border pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-mono">
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
