import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScanProvider } from './context/ScanContext';
import Landing from './pages/Landing';
import InputPage from './pages/InputPage';
import GraphView from './pages/GraphView';
import ExportReport from './pages/ExportReport';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

function App() {
  return (
    <ScanProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scan" element={<InputPage />} />
          <Route path="/graph/:scanId" element={<GraphView />} />
          <Route path="/export/:scanId" element={<ExportReport />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ScanProvider>
  );
}

export default App;
