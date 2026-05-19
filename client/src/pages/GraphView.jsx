import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import { useTheme } from '../context/ThemeContext';
import ForceGraph from '../components/ForceGraph';
import NodeDetailPanel from '../components/NodeDetailPanel';
import RiskBadge from '../components/RiskBadge';
import { Shield, ChevronDown, ChevronUp, Download, AlertTriangle, ShieldCheck, RefreshCw, Sun, Moon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const getOverallRiskLevel = (score) => {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  if (score >= 20) return 'LOW';
  return 'SAFE';
};

const GraphView = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { 
    graphData, setGraphData, 
    overallRiskScore, setOverallRiskScore, 
    aiSummary, setAiSummary,
    stackName, setStackName,
    selectedNode, setSelectedNode
  } = useScan();

  const [loading, setLoading] = useState(!graphData);
  const [summaryExpanded, setSummaryExpanded] = useState(true);

  useEffect(() => {
    if (!graphData) {
      const fetchScan = async () => {
        try {
          const res = await fetch(`${API_URL}/api/scan/${scanId}`);
          const data = await res.json();
          if (data.success) {
            setGraphData({ nodes: data.data.nodes, edges: data.data.edges });
            setOverallRiskScore(data.data.overallRiskScore);
            setAiSummary(data.data.aiSummary);
            setStackName(data.data.stackName);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchScan();
    }
  }, [scanId, graphData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-vulnmap-dark font-mono text-brand-text">
        <RefreshCw className="w-10 h-10 text-brand-green animate-spin mb-4" />
        <h2 className="text-xl font-bold tracking-widest uppercase">Loading Threat Map...</h2>
      </div>
    );
  }

  if (!graphData) return <div className="min-h-screen bg-vulnmap-dark text-brand-text p-10 font-mono">Scan not found.</div>;

  // Calculate statistics from nodes
  const totalNodes = graphData.nodes.length;
  const criticalCount = graphData.nodes.filter(n => n.riskLevel === 'CRITICAL').length;
  const highCount = graphData.nodes.filter(n => n.riskLevel === 'HIGH').length;
  const mediumCount = graphData.nodes.filter(n => n.riskLevel === 'MEDIUM').length;
  const lowCount = graphData.nodes.filter(n => n.riskLevel === 'LOW').length;
  const safeCount = graphData.nodes.filter(n => n.riskLevel === 'SAFE').length;

  return (
    <div className="h-screen w-full bg-vulnmap-dark flex flex-col overflow-hidden relative font-mono text-brand-text">
      
      {/* Top Navbar */}
      <div className="h-16 border-b border-vulnmap-border flex items-center justify-between px-6 bg-vulnmap-card z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Shield className="w-6 h-6 text-brand-green" />
          <span className="font-bold tracking-widest text-lg text-brand-text">DFX VULNMAP</span>
        </div>
        
        <div className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">
          STATUS: <span className="text-brand-green">ONLINE AUDIT ACTIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 border border-vulnmap-border bg-vulnmap-card text-brand-green hover:bg-brand-green hover:text-white dark:hover:text-black transition"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => navigate(`/export/${scanId}`)}
            className="flex items-center gap-2 bg-vulnmap-card hover:bg-brand-green hover:text-white dark:hover:text-black border border-vulnmap-border px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Left HUD Sidebar Panel */}
        <aside className="w-80 border-r border-vulnmap-border bg-vulnmap-card/85 backdrop-blur-md flex flex-col p-6 space-y-6 z-10 overflow-y-auto hidden lg:flex">
          <div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase mb-1">TARGET AUDIT FILE</div>
            <h2 className="text-lg font-bold text-brand-text uppercase tracking-tight truncate" title={stackName}>{stackName}</h2>
          </div>

          {/* Risk Level Widget */}
          <div className="bg-vulnmap-dark p-4 border border-vulnmap-border flex flex-col justify-between">
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase mb-2">OVERALL DEVIATION</div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold tracking-tighter text-brand-text">{overallRiskScore}<span className="text-xs text-gray-400 dark:text-gray-600">/100</span></span>
              <RiskBadge level={getOverallRiskLevel(overallRiskScore)} className="text-[10px] px-2.5 py-0.5 font-bold" />
            </div>
          </div>

          {/* Threat Metrics Counters */}
          <div className="space-y-3">
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase mb-2">THREAT METRICS</div>
            
            <div className="flex justify-between items-center text-xs p-2 bg-vulnmap-dark border border-vulnmap-border">
              <span className="text-gray-500 dark:text-gray-400">TOTAL NODES</span>
              <span className="font-bold">{totalNodes}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs p-2 bg-vulnmap-dark border border-risk-critical/20">
              <span className="text-risk-critical flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> CRITICAL</span>
              <span className="font-bold text-risk-critical">{criticalCount}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs p-2 bg-vulnmap-dark border border-risk-high/20">
              <span className="text-risk-high flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> HIGH</span>
              <span className="font-bold text-risk-high">{highCount}</span>
            </div>

            <div className="flex justify-between items-center text-xs p-2 bg-vulnmap-dark border border-vulnmap-border">
              <span className="text-risk-medium">MEDIUM</span>
              <span className="font-bold text-risk-medium">{mediumCount}</span>
            </div>

            <div className="flex justify-between items-center text-xs p-2 bg-vulnmap-dark border border-vulnmap-border">
              <span className="text-risk-low">LOW</span>
              <span className="font-bold text-risk-low">{lowCount}</span>
            </div>

            <div className="flex justify-between items-center text-xs p-2 bg-vulnmap-dark border border-brand-green/20">
              <span className="text-brand-green flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> SECURE</span>
              <span className="font-bold text-brand-green">{safeCount}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div className="border border-vulnmap-border p-3 text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed bg-vulnmap-dark">
              <div className="text-brand-green font-bold mb-1">INSTRUCTION:</div>
              Drag nodes to rearrange physics. Hover to view links. Click a node to analyze exploit chains.
            </div>
          </div>
        </aside>

        {/* Center D3 Container */}
        <div className="flex-1 h-full relative">
          
          {/* Small Legend Overlay (For mobile since HUD is hidden) */}
          <div className="absolute top-4 left-4 z-10 flex gap-2 text-[9px] bg-vulnmap-card/90 backdrop-blur px-2.5 py-1.5 border border-vulnmap-border lg:hidden">
            {['CRITICAL', 'HIGH', 'SAFE'].map(level => (
              <div key={level} className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  level==='CRITICAL' ? 'bg-risk-critical' : 
                  level==='HIGH' ? 'bg-risk-high' : 'bg-brand-green'
                }`} />
                <span className="text-gray-500 dark:text-gray-400">{level}</span>
              </div>
            ))}
          </div>

          {/* D3 canvas component */}
          <ForceGraph 
            nodes={graphData.nodes} 
            edges={graphData.edges} 
            onNodeClick={(node) => setSelectedNode(node)}
            selectedNodeId={selectedNode?.id}
          />
          
          {/* Executive AI summary on top right */}
          {aiSummary && (
            <div className="absolute top-4 right-4 z-10 w-80 bg-vulnmap-card/90 backdrop-blur border border-vulnmap-border shadow-xl overflow-hidden transition-all duration-300 hidden md:block">
              <div 
                className="p-3 bg-vulnmap-dark border-b border-vulnmap-border flex justify-between items-center cursor-pointer hover:bg-vulnmap-dark/50"
                onClick={() => setSummaryExpanded(!summaryExpanded)}
              >
                <span className="font-bold text-xs flex items-center gap-2 uppercase tracking-widest text-brand-text"><Shield className="w-4 h-4 text-brand-green"/> AI Security Brief</span>
                {summaryExpanded ? <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
              </div>
              {summaryExpanded && (
                <div className="p-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-h-60 overflow-y-auto font-sans">
                  {aiSummary}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Slide-in detail panel */}
        {selectedNode && (
          <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}

      </div>
    </div>
  );
};

export default GraphView;
