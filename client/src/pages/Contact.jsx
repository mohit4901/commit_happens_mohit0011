import React, { useState } from 'react';
import SharedPage from './SharedPage';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SharedPage>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 border border-brand-green bg-brand-green/10 text-brand-green px-3 py-1.5 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest">Connect</span>
          </div>
          <h1 className="text-5xl font-mono font-bold mb-6">CONTACT SALES</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Ready to integrate VulnMap into your enterprise CI/CD systems, or need on-premise installation support? Fill out the form and a security engineer will reach out within 4 hours.
          </p>

          <div className="space-y-4 font-mono text-sm text-gray-500">
            <div>EMAIL: sales@dfxsecurity.com</div>
            <div>PHONE: +1 (800) 555-DFXSEC</div>
            <div>HQ: Silicon Valley / Remote</div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-vulnmap-border p-8">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="text-brand-green font-mono text-xl mb-4">MESSAGE TRANSMITTED</div>
              <p className="text-gray-400">We have received your security audit request. Our engineering team will review it shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-vulnmap-dark border border-vulnmap-border rounded p-3 text-white outline-none focus:border-brand-green font-mono"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-vulnmap-dark border border-vulnmap-border rounded p-3 text-white outline-none focus:border-brand-green font-mono"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">Company / Organization</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-vulnmap-dark border border-vulnmap-border rounded p-3 text-white outline-none focus:border-brand-green font-mono"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">Message / Scope Description</label>
                <textarea 
                  rows="4"
                  className="w-full bg-vulnmap-dark border border-vulnmap-border rounded p-3 text-white outline-none focus:border-brand-green font-mono"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-brand-green text-black font-mono font-bold hover:bg-green-400 transition"
              >
                SUBMIT REQUEST
              </button>
            </form>
          )}
        </div>
      </div>
    </SharedPage>
  );
};

export default Contact;
