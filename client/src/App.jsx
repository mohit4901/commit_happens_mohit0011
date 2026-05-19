import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScanProvider } from './context/ScanContext';
import Landing from './pages/Landing';
import InputPage from './pages/InputPage';
import GraphView from './pages/GraphView';
import ExportReport from './pages/ExportReport';

function App() {
  return (
    <ScanProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scan" element={<InputPage />} />
          <Route path="/graph/:scanId" element={<GraphView />} />
          <Route path="/export/:scanId" element={<ExportReport />} />
        </Routes>
      </Router>
    </ScanProvider>
  );
}

export default App;
