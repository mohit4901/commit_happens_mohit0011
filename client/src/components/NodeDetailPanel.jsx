import React, { useState } from 'react';
import { X, Loader2, Terminal, AlertTriangle, ShieldCheck } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useScan } from '../context/ScanContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const NodeDetailPanel = ({ node, onClose }) => {
  const { scanId } = useScan();
  const [loading, setLoading] = useState(false);
  const [attackPath, setAttackPath] = useState(null);
  const [showAll, setShowAll] = useState(false);

  if (!node) return null;

  const handleSimulate = async () => {
    setLoading(true);
    setAttackPath(null);
    try {
      const res = await fetch(`${API_URL}/api/ai/attack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId, nodeId: node.id })
      });
      const data = await res.json();
      if (data.success) {
        setAttackPath(data.attackPath);
      } else {
        setAttackPath(`[ERROR] AI Simulation failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      setAttackPath(`[ERROR] Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const cvesToShow = showAll ? node.cves : node.cves.slice(0, 5);

  const getPanelBorderColor = () => {
    if (node.riskLevel === 'CRITICAL') return 'border-risk-critical';
    if (node.riskLevel === 'HIGH') return 'border-risk-high';
    if (node.riskLevel === 'MEDIUM') return 'border-risk-medium';
    return 'border-vulnmap-border';
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-full md:w-[420px] bg-vulnmap-card border-l ${getPanelBorderColor()} flex flex-col shadow-2xl z-20 font-mono transition-all duration-300`}>
      
      {/* Panel Header */}
      <div className="p-6 border-b border-vulnmap-border flex justify-between items-start bg-vulnmap-card">
        <div>
          <div className="text-[10px] text-brand-green font-bold tracking-widest mb-1">DEPENDENCY MATRIX</div>
          <h2 className="text-2xl font-bold tracking-tight text-brand-text">{node.id}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-400 text-xs">v{node.version}</span>
            <span className="bg-vulnmap-dark border border-vulnmap-border px-2 py-0.5 rounded text-[10px] text-gray-500 dark:text-gray-400 uppercase">{node.type}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-vulnmap-dark border border-vulnmap-border rounded transition text-gray-500 hover:text-brand-text">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-vulnmap-card/95">
        
        {/* Risk Score Gauge */}
        <div className="bg-vulnmap-dark p-4 border border-vulnmap-border flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-wider mb-1 uppercase">RISK FACTOR</div>
            <div className="text-3xl font-bold text-brand-text tracking-tighter">{node.riskScore}<span className="text-sm text-gray-400 dark:text-gray-600">/100</span></div>
          </div>
          <RiskBadge level={node.riskLevel} className="text-xs px-3 py-1 font-bold" />
        </div>

        {/* Known Vulnerabilities */}
        <div>
          <h3 className="font-bold text-xs text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase flex justify-between items-center">
            <span>CVE Threat Index ({node.cves.length})</span>
            {node.cves.length > 5 && (
              <button onClick={() => setShowAll(!showAll)} className="text-[10px] text-brand-green hover:underline uppercase">
                {showAll ? 'Show less' : 'Show all'}
              </button>
            )}
          </h3>
          
          <div className="space-y-4">
            {node.cves.length === 0 ? (
              <div className="bg-vulnmap-dark border border-vulnmap-border p-4 text-center text-gray-500 text-xs italic flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green" /> No vulnerabilities detected.
              </div>
            ) : (
              cvesToShow.map((cve, idx) => (
                <div key={idx} className="bg-vulnmap-dark p-4 border border-vulnmap-border hover:border-brand-green/45 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-risk-critical tracking-wider">{cve.cveId}</span>
                    <span className="text-[10px] bg-red-950/40 text-risk-critical px-2 py-0.5 border border-risk-critical/20 font-bold">{cve.severity}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">{cve.summary}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Attack Simulator Terminal */}
        {node.cves.length > 0 && (
          <div className="border-t border-vulnmap-border pt-6">
            <h3 className="font-bold text-xs text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-green" /> Attack Path Simulation
            </h3>

            <button 
              onClick={handleSimulate}
              disabled={loading}
              className="w-full py-3 bg-transparent border border-brand-green text-brand-green hover:bg-brand-green hover:text-white dark:hover:text-black font-bold tracking-widest text-xs transition flex justify-center items-center gap-2 disabled:opacity-50 uppercase cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> RUNNING EXPLOIT SIMULATOR...
                </>
              ) : (
                'INJECT EXPLOIT SIMULATION'
              )}
            </button>

            {/* Retro terminal output styling */}
            {(loading || attackPath) && (
              <div className="mt-4 bg-[#050811] border border-brand-green/30 p-4 rounded text-xs font-mono leading-relaxed relative overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                
                <div className="text-brand-green mb-2 opacity-80 border-b border-brand-green/20 pb-2">DFX EXPLOIT TOOLKIT V2.4</div>
                
                {loading ? (
                  <div className="text-brand-green/60 animate-pulse">
                    <div>[~] Initializing NIM environment...</div>
                    <div>[~] Constructing payload chain...</div>
                    <div>[~] Exploiting dependency vector...</div>
                  </div>
                ) : (
                  <div className="text-brand-green max-h-60 overflow-y-auto custom-scrollbar font-mono text-[11px] whitespace-pre-wrap">
                    {attackPath}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDetailPanel;
