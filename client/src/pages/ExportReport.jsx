import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import { FileText, Download, Link as LinkIcon, ArrowLeft, Check, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ExportReport = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 text-risk-critical rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Your Risk Report is Ready</h1>
        <p className="text-center text-gray-500 mb-8">{stackName || `Scan ID: ${scanId.substring(0,8)}...`}</p>

        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-gray-900">{overallRiskScore}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Overall Risk</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-gray-900">{nodeCount}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Total Nodes</div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-risk-critical">{criticalCount}</div>
            <div className="text-xs text-risk-critical uppercase tracking-wide mt-1">Critical</div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleDownload}
            disabled={loading}
            className="w-full py-4 bg-risk-critical hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
            {loading ? 'Generating PDF...' : 'Download PDF Report'}
          </button>
          
          <div className="flex gap-4">
            <button 
              onClick={handleCopyLink}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <LinkIcon className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy Graph Link'}
            </button>
            <button 
              onClick={() => navigate(`/graph/${scanId}`)}
              className="flex-1 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
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
