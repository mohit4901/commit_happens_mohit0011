import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, FileText, Bot } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleLoadDemo = () => {
    navigate('/scan', { state: { demoData: true } });
  };

  return (
    <div className="min-h-screen bg-vulnmap-dark flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl w-full">
        <div className="flex justify-center mb-6">
          <Shield className="w-16 h-16 text-risk-critical" />
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          See your supply chain attack surface — before attackers do.
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Upload your tech stack. Get a real-time vulnerability graph with AI-powered attack path simulation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button 
            onClick={() => navigate('/scan')}
            className="px-8 py-3 bg-risk-critical hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Start Free Scan
          </button>
          <button 
            onClick={handleLoadDemo}
            className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-vulnmap-dark font-semibold rounded-lg transition-colors text-lg"
          >
            Load Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-vulnmap-border">
          <div className="flex flex-col items-center">
            <Activity className="w-8 h-8 text-risk-medium mb-3" />
            <h3 className="font-semibold mb-1">Real CVE data</h3>
            <p className="text-gray-500 text-sm">Fetched instantly from NVD + OSV</p>
          </div>
          <div className="flex flex-col items-center">
            <Bot className="w-8 h-8 text-risk-critical mb-3" />
            <h3 className="font-semibold mb-1">AI attack path simulation</h3>
            <p className="text-gray-500 text-sm">Powered by Claude 3.5 Sonnet</p>
          </div>
          <div className="flex flex-col items-center">
            <FileText className="w-8 h-8 text-risk-high mb-3" />
            <h3 className="font-semibold mb-1">Exportable risk report</h3>
            <p className="text-gray-500 text-sm">PDF reports for board meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
