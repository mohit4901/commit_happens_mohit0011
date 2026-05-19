import React from 'react';
import { Link } from 'react-router-dom';

const SharedPage = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-vulnmap-dark text-white font-sans flex flex-col items-center">
      <div className="w-full max-w-7xl p-4 lg:p-8">
        <nav className="flex justify-between items-center py-5 px-6 border border-vulnmap-border mb-12">
          <Link to="/" className="text-3xl font-mono tracking-widest font-bold hover:text-brand-green transition">DFX</Link>
          <div className="hidden md:flex gap-8 font-mono text-sm text-gray-300 tracking-wider">
            <Link to="/services" className="hover:text-brand-green transition">Services</Link>
            <Link to="/industries" className="hover:text-brand-green transition">Industries</Link>
            <Link to="/case-studies" className="hover:text-brand-green transition">Case Studies</Link>
            <Link to="/pricing" className="hover:text-brand-green transition">Pricing</Link>
            <Link to="/contact" className="hover:text-brand-green transition">Contact</Link>
          </div>
          <Link to="/scan" className="bg-brand-green text-black px-6 py-2 font-mono font-bold hover:bg-green-400 transition">
            GET A DEMO
          </Link>
        </nav>
        
        <main className="w-full flex-1">
          {children || (
            <div className="flex flex-col items-center justify-center text-center py-32">
              <h1 className="text-5xl font-mono font-bold mb-4">{title}</h1>
              <p className="text-gray-400 max-w-lg mx-auto border border-vulnmap-border p-4 bg-[#0a0a0a]">This module is currently being provisioned for the DFX enterprise environment.</p>
            </div>
          )}
        </main>

        <footer className="border-t border-vulnmap-border pt-8 pb-12 mt-24 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-mono">
          <div>© {new Date().getFullYear()} DFX Security. Built for the Commit Happens Hackathon.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-brand-green transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-brand-green transition">Terms of Service</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SharedPage;
