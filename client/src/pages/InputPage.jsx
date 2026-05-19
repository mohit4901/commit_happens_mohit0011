import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import { UploadCloud, Plus, X, Loader2 } from 'lucide-react';
import sampleStackData from '../../../demo/sample-stack.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const InputPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setScanId, setGraphData, setOverallRiskScore, setAiSummary, setStackName } = useScan();
  
  const [stackNameLocal, setStackNameLocal] = useState('');
  const [packages, setPackages] = useState([]);
  const [pkgName, setPkgName] = useState('');
  const [pkgVersion, setPkgVersion] = useState('');
  const [pkgEcosystem, setPkgEcosystem] = useState('npm');
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.demoData) {
      setStackNameLocal(sampleStackData.stackName);
      setPackages(sampleStackData.packages);
    }
  }, [location]);

  const handleAddPackage = () => {
    if (!pkgName || !pkgVersion) return;
    if (packages.length >= 15) {
      setError('Max 15 packages allowed for demo.');
      return;
    }
    setPackages([...packages, { name: pkgName, version: pkgVersion, type: pkgEcosystem }]);
    setPkgName('');
    setPkgVersion('');
  };

  const handleRemovePackage = (index) => {
    const newPkgs = [...packages];
    newPkgs.splice(index, 1);
    setPackages(newPkgs);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.json')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (json.stackName) setStackNameLocal(json.stackName);
          if (json.packages) setPackages(json.packages);
          else if (json.dependencies) {
            const deps = Object.keys(json.dependencies).map(name => ({
              name,
              version: json.dependencies[name].replace(/[\^~]/g, ''),
              type: 'npm'
            }));
            setPackages(deps.slice(0, 15));
          }
        } catch (err) {
          setError('Invalid JSON file');
        }
      };
      reader.readAsText(droppedFile);
    }
  };

  const handleSubmit = async () => {
    if (packages.length === 0 && !file) {
      setError('Please add packages or upload a file.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      let response;
      if (file && packages.length === 0) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('stackName', stackNameLocal);
        response = await fetch(`${API_URL}/api/scan`, {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(`${API_URL}/api/scan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stackName: stackNameLocal || 'Manual Stack', packages })
        });
      }

      const data = await response.json();
      if (data.success) {
        setScanId(data.scanId);
        setGraphData(data.graph);
        setOverallRiskScore(data.overallRiskScore);
        setAiSummary(data.aiSummary);
        setStackName(stackNameLocal || 'Manual Stack');
        navigate(`/graph/${data.scanId}`);
      } else {
        throw new Error(data.error || 'Failed to scan');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-vulnmap-dark">
        <Loader2 className="w-16 h-16 text-risk-critical animate-spin mb-4" />
        <h2 className="text-2xl font-semibold">Fetching CVE data...</h2>
        <p className="text-gray-400 mt-2">Analyzing vulnerability chain across NVD and OSV databases.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-vulnmap-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-full bg-risk-critical flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <h1 className="text-2xl font-bold">VulnMap</h1>
        </div>

        <h2 className="text-3xl font-bold mb-8">Define Your Tech Stack</h2>
        {error && <div className="bg-risk-critical/20 text-risk-critical p-4 rounded mb-6 border border-risk-critical/50">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-vulnmap-card p-6 rounded-xl border border-vulnmap-border">
            <h3 className="text-xl font-semibold mb-4">Manual Entry</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Stack Name</label>
              <input 
                type="text" 
                className="w-full bg-vulnmap-dark border border-vulnmap-border rounded p-2 text-white outline-none focus:border-risk-critical"
                placeholder="e.g. Core Banking API"
                value={stackNameLocal}
                onChange={(e) => setStackNameLocal(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Package name" className="flex-1 bg-vulnmap-dark border border-vulnmap-border rounded p-2 outline-none focus:border-risk-critical" value={pkgName} onChange={(e)=>setPkgName(e.target.value)} />
              <input type="text" placeholder="Version" className="w-24 bg-vulnmap-dark border border-vulnmap-border rounded p-2 outline-none focus:border-risk-critical" value={pkgVersion} onChange={(e)=>setPkgVersion(e.target.value)} />
              <select className="bg-vulnmap-dark border border-vulnmap-border rounded p-2 outline-none focus:border-risk-critical" value={pkgEcosystem} onChange={(e)=>setPkgEcosystem(e.target.value)}>
                <option value="npm">npm</option>
                <option value="PyPI">PyPI</option>
                <option value="Maven">Maven</option>
                <option value="Go">Go</option>
                <option value="crates.io">Cargo</option>
              </select>
              <button onClick={handleAddPackage} className="bg-vulnmap-border p-2 rounded hover:bg-gray-700 transition"><Plus /></button>
            </div>

            <div className="flex flex-wrap gap-2">
              {packages.map((pkg, i) => (
                <div key={i} className="flex items-center gap-2 bg-vulnmap-dark border border-vulnmap-border px-3 py-1 rounded-full text-sm">
                  <span>{pkg.name}@{pkg.version}</span>
                  <span className="text-gray-500 text-xs">{pkg.type}</span>
                  <X className="w-3 h-3 cursor-pointer hover:text-risk-critical" onClick={() => handleRemovePackage(i)} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-vulnmap-card p-6 rounded-xl border border-vulnmap-border flex flex-col">
            <h3 className="text-xl font-semibold mb-4">JSON / SBOM Upload</h3>
            <div 
              className="flex-1 border-2 border-dashed border-vulnmap-border rounded-xl flex flex-col items-center justify-center p-8 bg-vulnmap-dark/50 hover:bg-vulnmap-dark transition cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById('fileUpload').click()}
            >
              <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-center text-gray-400">
                Drop your package.json, requirements.txt export, or SBOM JSON here.<br/>
                <span className="text-sm">Or click to browse</span>
              </p>
              <input 
                id="fileUpload" 
                type="file" 
                className="hidden" 
                accept=".json,application/json"
                onChange={(e) => {
                  if(e.target.files[0]) {
                    setFile(e.target.files[0]);
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      try {
                        const json = JSON.parse(ev.target.result);
                        if(json.packages) setPackages(json.packages);
                        if(json.stackName) setStackNameLocal(json.stackName);
                      } catch(e){}
                    };
                    reader.readAsText(e.target.files[0]);
                  }
                }} 
              />
            </div>
            {file && <div className="mt-4 text-center text-risk-low font-semibold">Loaded: {file.name}</div>}
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-risk-critical hover:bg-red-700 text-white font-bold rounded-xl text-xl transition-colors shadow-lg"
        >
          Analyze Vulnerabilities →
        </button>
      </div>
    </div>
  );
};

export default InputPage;
