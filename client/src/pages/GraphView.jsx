import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import ForceGraph from '../components/ForceGraph';
import NodeDetailPanel from '../components/NodeDetailPanel';
import RiskBadge from '../components/RiskBadge';
import { Shield, ChevronDown, ChevronUp, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  const { 
    graphData, setGraphData, 
    overallRiskScore, setOverallRiskScore, 
    aiSummary, setAiSummary,
    stackName, setStackName,
    selectedNode, setSelectedNode
  } = useScan();

  const [loading, setLoading] = useState(!graphData);
  const [summaryExpanded, setSummaryExpanded] = useState(false);

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
    return <div className="min-h-screen flex items-center justify-center bg-vulnmap-dark text-white">Loading Graph...</div>;
  }

  if (!graphData) return <div className="min-h-screen bg-vulnmap-dark text-white p-10">Scan not found.</div>;

  return (
    <div className="h-screen w-full bg-vulnmap-dark flex flex-col overflow-hidden relative">
      <div className="h-16 border-b border-vulnmap-border flex items-center justify-between px-6 bg-vulnmap-card z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Shield className="w-6 h-6 text-risk-critical" />
          <span className="font-bold text-lg hidden sm:block">VulnMap</span>
        </div>
        
        <div className="font-semibold truncate max-w-xs sm:max-w-md text-center text-gray-200">
          {stackName}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-400">Risk:</span>
            <span className="font-bold">{overallRiskScore}</span>
            <RiskBadge level={getOverallRiskLevel(overallRiskScore)} />
          </div>
          <button 
            onClick={() => navigate(`/export/${scanId}`)}
            className="flex items-center gap-2 bg-vulnmap-border hover:bg-gray-700 px-3 py-1.5 rounded text-sm font-medium transition"
          >
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="absolute top-20 left-6 z-10 flex gap-3 text-xs bg-vulnmap-card/80 backdrop-blur px-3 py-2 rounded-lg border border-vulnmap-border">
        {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'SAFE'].map(level => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${
              level==='CRITICAL' ? 'bg-risk-critical' : 
              level==='HIGH' ? 'bg-risk-high' : 
              level==='MEDIUM' ? 'bg-risk-medium' : 
              level==='LOW' ? 'bg-risk-low' : 'bg-risk-safe'
            }`} />
            <span className="text-gray-400">{level}</span>
          </div>
        ))}
      </div>

      {aiSummary && (
        <div className="absolute top-20 right-6 z-10 w-80 bg-vulnmap-card/90 backdrop-blur border border-vulnmap-border rounded-lg shadow-xl overflow-hidden transition-all duration-300 hidden md:block">
          <div 
            className="p-3 bg-vulnmap-dark border-b border-vulnmap-border flex justify-between items-center cursor-pointer hover:bg-gray-900"
            onClick={() => setSummaryExpanded(!summaryExpanded)}
          >
            <span className="font-semibold text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-risk-critical"/> AI Executive Brief</span>
            {summaryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          {summaryExpanded && (
            <div className="p-4 text-sm text-gray-300 leading-relaxed max-h-60 overflow-y-auto">
              {aiSummary}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 w-full relative">
        <ForceGraph 
          nodes={graphData.nodes} 
          edges={graphData.edges} 
          onNodeClick={(node) => setSelectedNode(node)}
          selectedNodeId={selectedNode?.id}
        />
      </div>

      {selectedNode && (
        <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  );
};

export default GraphView;
