import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-vulnmap-dark text-white font-sans flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center py-5 px-6 border border-vulnmap-border mb-6">
          <div className="text-3xl font-mono tracking-widest font-bold">DFX</div>
          <div className="hidden md:flex gap-8 font-mono text-sm text-gray-300 tracking-wider">
            <a href="#" className="hover:text-brand-green transition">Services</a>
            <a href="#" className="hover:text-brand-green transition">Industries</a>
            <a href="#" className="hover:text-brand-green transition">Case Studies</a>
            <a href="#" className="hover:text-brand-green transition">Pricing</a>
            <a href="#" className="hover:text-brand-green transition">Contact</a>
          </div>
          <button 
            onClick={handleDemo}
            className="bg-brand-green text-black px-6 py-2 font-mono font-bold hover:bg-green-400 transition"
          >
            GET A DEMO
          </button>
        </nav>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-2 border border-vulnmap-border mb-6 min-h-[600px] relative">
          
          {/* Left Column */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 border border-vulnmap-border bg-[#0a0a0a] px-3 py-1.5 w-max mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
              <span className="text-xs text-gray-300">The №1 choice for enterprise cybersecurity solutions</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-mono font-bold leading-tight mb-8">
              COMPREHENSIVE CYBERSECURITY SOLUTIONS DESIGNED FOR EVERY DIGITAL BUSINESS
            </h1>

            <p className="text-gray-400 max-w-lg mb-10 text-sm leading-relaxed">
              We combine advanced technology with expert guidance to protect your data, detect threats early, and ensure your operations run securely around the clock
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handleDemo}
                className="bg-brand-green text-black px-8 py-3 font-mono font-bold hover:bg-green-400 transition"
              >
                GET A DEMO
              </button>
              <button className="border border-vulnmap-border bg-transparent text-white px-8 py-3 font-mono font-bold hover:border-brand-green transition">
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right Column (Fingerprint) */}
          <div className="relative flex items-center justify-center p-8 bg-[#0a0a0a] border-l border-vulnmap-border">
            <img 
              src="/fingerprint.png" 
              alt="Digital Fingerprint" 
              className="max-h-[500px] object-contain mix-blend-screen opacity-90"
            />
            
            {/* Trusted By - Absolute positioned at bottom right */}
            <div className="absolute bottom-6 right-8 text-right">
              <p className="text-[10px] text-gray-500 font-bold mb-3 tracking-widest">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex items-center gap-6 justify-end opacity-70">
                {/* IBM-like text */}
                <span className="font-bold text-xl tracking-tighter">IBM</span>
                {/* Abstract Triangle */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 22h20L12 2z"/></svg>
                {/* AWS-like text */}
                <span className="font-bold text-lg">aws</span>
                {/* GitHub-like icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </div>
            </div>
          </div>

        </main>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2">99%</div>
            <div className="text-sm text-gray-400">Advanced threat detection accuracy</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2">60+</div>
            <div className="text-sm text-gray-400">Enterprise clients protected globally</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2">120+</div>
            <div className="text-sm text-gray-400">Incidents resolved in real time monthly</div>
          </div>
          <div className="border border-vulnmap-border p-8" style={cardStyle}>
            <div className="text-4xl font-bold font-mono mb-2">24/7</div>
            <div className="text-sm text-gray-400">Continuous monitoring & response</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;
