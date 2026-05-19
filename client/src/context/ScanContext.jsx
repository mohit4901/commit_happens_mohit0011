import React, { createContext, useContext, useState } from 'react';

const ScanContext = createContext();

export function ScanProvider({ children }) {
  const [scanId, setScanId] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [overallRiskScore, setOverallRiskScore] = useState(0);
  const [aiSummary, setAiSummary] = useState('');
  const [stackName, setStackName] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <ScanContext.Provider value={{
      scanId, setScanId,
      graphData, setGraphData,
      overallRiskScore, setOverallRiskScore,
      aiSummary, setAiSummary,
      stackName, setStackName,
      selectedNode, setSelectedNode,
      pdfUrl, setPdfUrl
    }}>
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  return useContext(ScanContext);
}
