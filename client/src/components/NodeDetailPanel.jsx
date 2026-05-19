import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useScan } from '../context/ScanContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NodeDetailPanel = ({ node, onClose }) => {
  const { scanId } = useScan();
  const [loading, setLoading] = useState(false);
  const [attackPath, setAttackPath] = useState(null);
  const [showAll, setShowAll] = useState(false);

  if (!node) return null;

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/ai/attack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId, nodeId: node.id })
      });
      const data = await res.json();
      if (data.success) {
        setAttackPath(data.attackPath);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cvesToShow = showAll ? node.cves : node.cves.slice(0, 5);

  return (
    <div className={`fixed right-0 top-0 h-full w-full md:w-[380px] bg-vulnmap-card border-l border-vulnmap-border flex flex-col shadow-2xl transition-transform duration-300 transform translate-x-0`}>
      
      <div className="p-4 border-b border-vulnmap-border flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{node.id}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 text-sm">v{node.version}</span>
            <span className="bg-vulnmap-dark px-2 py-0.5 rounded text-xs text-gray-300">{node.type}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-vulnmap-dark rounded-full transition">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        
        <div className="bg-vulnmap-dark p-4 rounded-lg flex items-center justify-between mb-6 border border-vulnmap-border">
          <div>
            <div className="text-gray-400 text-sm mb-1">Risk Score</div>
            <div className="text-3xl font-bold">{node.riskScore}/100</div>
          </div>
          <RiskBadge level={node.riskLevel} className="text-sm px-3 py-1" />
        </div>

        <h3 className="font-semibold mb-3 flex justify-between items-center">
          <span>Known Vulnerabilities ({node.cves.length})</span>
          {node.cves.length > 5 && (
            <button onClick={() => setShowAll(!showAll)} className="text-xs text-blue-400 hover:underline">
              {showAll ? 'Show less' : 'Show all'}
            </button>
          )}
        </h3>
        
        <div className="space-y-3 mb-6">
          {node.cves.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No CVEs found for this package version.</p>
          ) : (
            cvesToShow.map((cve, idx) => (
              <div key={idx} className="bg-vulnmap-dark p-3 rounded border border-vulnmap-border">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-risk-critical text-sm">{cve.cveId}</span>
                  <RiskBadge level={cve.severity} />
                </div>
                <p className="text-xs text-gray-300 line-clamp-2" title={cve.summary}>{cve.summary}</p>
              </div>
            ))
          )}
        </div>

        {node.cves.length > 0 && (
          <div className="border-t border-vulnmap-border pt-6 pb-6">
            <button 
              onClick={handleSimulate}
              disabled={loading}
              className="w-full py-3 border border-risk-critical text-risk-critical hover:bg-risk-critical hover:text-white rounded-lg font-semibold transition flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Simulate Attack Path'}
            </button>

            {attackPath && (
              <div className="mt-4 bg-[#1a0f14] border border-risk-critical/30 p-4 rounded-lg text-sm text-gray-300 whitespace-pre-wrap">
                {attackPath}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDetailPanel;
