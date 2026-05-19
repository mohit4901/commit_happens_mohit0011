import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import { useTheme } from '../context/ThemeContext';
import { FileText, Download, Link as LinkIcon, ArrowLeft, Check, Loader2, Sun, Moon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const ExportReport = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { overallRiskScore, graphData, stackName } = useScan();
  
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/report/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId })
      });
      const data = await res.json();
      if (data.success && data.pdfUrl) {
        window.open(`${API_URL}${data.pdfUrl}`, '_blank');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/graph/${scanId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nodeCount = graphData?.nodes?.length || 0;
  const criticalCount = graphData?.nodes?.filter(n => n.riskLevel === 'CRITICAL').length || 0;

  return (
    <div className="min-h-screen bg-vulnmap-dark flex flex-col items-center justify-center p-6 text-brand-text font-mono transition-colors duration-200">
      
      {/* Top right theme toggle for convenience */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={toggleTheme}
          className="p-2 border border-vulnmap-border bg-vulnmap-card text-brand-green hover:bg-brand-green hover:text-white dark:hover:text-black transition"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>
      </div>

      <div className="w-full max-w-xl bg-vulnmap-card border border-vulnmap-border p-8 md:p-12 shadow-2xl">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/40 text-risk-critical rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-brand-text tracking-tight">Your Risk Report is Ready</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">{stackName || `Scan ID: ${scanId.substring(0,8)}...`}</p>

        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          <div className="bg-vulnmap-dark p-4 border border-vulnmap-border">
            <div className="text-3xl font-bold text-brand-text">{overallRiskScore}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Overall Risk</div>
          </div>
          <div className="bg-vulnmap-dark p-4 border border-vulnmap-border">
            <div className="text-3xl font-bold text-brand-text">{nodeCount}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">Total Nodes</div>
          </div>
          <div className="bg-red-950/30 border border-risk-critical/30 p-4">
            <div className="text-3xl font-bold text-risk-critical">{criticalCount}</div>
            <div className="text-[10px] text-risk-critical uppercase tracking-wide mt-1">Critical</div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleDownload}
            disabled={loading}
            className="w-full py-4 bg-risk-critical hover:bg-red-700 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
            {loading ? 'Generating PDF...' : 'Download PDF Report'}
          </button>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleCopyLink}
              className="flex-1 py-3 bg-vulnmap-dark border border-vulnmap-border hover:bg-vulnmap-dark/80 text-brand-text font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <LinkIcon className="w-5 h-5 text-brand-green" />}
              {copied ? 'Copied!' : 'Copy Graph Link'}
            </button>
            <button 
              onClick={() => navigate(`/graph/${scanId}`)}
              className="flex-1 py-3 bg-transparent border border-vulnmap-border hover:border-brand-green text-brand-text font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Graph
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExportReport;
