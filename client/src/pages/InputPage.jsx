import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import { UploadCloud, Plus, X, Loader2, Code, ShieldAlert } from 'lucide-react';
import sampleStackData from '../../../demo/sample-stack.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
      setStackNameLocal(sampleStackData.name || 'Demo App');
      const deps = sampleStackData.dependencies || {};
      const devDeps = sampleStackData.devDependencies || {};
      const allDeps = { ...deps, ...devDeps };
      const pkgs = Object.keys(allDeps).map(name => ({
        name,
        version: allDeps[name].replace(/[\^~><=]/g, '').split(' ')[0],
        type: 'npm'
      }));
      setPackages(pkgs);
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
          if (json.name) setStackNameLocal(json.name);
          if (json.packages) setPackages(json.packages);
          else if (json.dependencies || json.devDependencies) {
            const deps = json.dependencies || {};
            const devDeps = json.devDependencies || {};
            const allDeps = { ...deps, ...devDeps };
            const parsedDeps = Object.keys(allDeps).map(name => ({
              name,
              version: allDeps[name].replace(/[\^~><=]/g, '').split(' ')[0],
              type: 'npm'
            }));
            setPackages(parsedDeps.slice(0, 15));
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
        formData.append('stackName', stackNameLocal || 'Uploaded Stack');
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-vulnmap-dark font-mono text-center px-4">
        <Loader2 className="w-16 h-16 text-brand-green animate-spin mb-6" />
        <h2 className="text-2xl font-bold mb-2">SCANNING YOUR STACK</h2>
        <p className="text-gray-400 max-w-md mx-auto">Querying National Vulnerability Database (NVD) & OSV... Mapping dependencies... Calling NVIDIA NIM for attack path simulation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vulnmap-dark text-white font-sans flex flex-col items-center">
      <div className="w-full max-w-7xl p-4 lg:p-8">
        
        {/* Minimal Navbar */}
        <nav className="flex justify-between items-center py-5 px-6 border border-vulnmap-border mb-12">
          <Link to="/" className="text-3xl font-mono tracking-widest font-bold hover:text-brand-green transition">DFX</Link>
          <div className="text-sm font-mono text-brand-green border border-brand-green px-4 py-1 rounded-full">Secure Scan Mode</div>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-mono font-bold mb-4 uppercase">Upload Your Stack</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Drag and drop your project's <code className="bg-vulnmap-card border border-vulnmap-border px-2 py-0.5 rounded">package.json</code> file to instantly visualize vulnerabilities and attack paths in your dependencies.
          </p>
        </div>

        {error && (
          <div className="bg-risk-critical/10 text-risk-critical p-4 rounded-xl mb-8 border border-risk-critical/50 flex items-center gap-3 max-w-4xl mx-auto">
            <ShieldAlert className="w-6 h-6" />
            <span className="font-mono">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* File Upload Area */}
          <div className="bg-[#0a0a0a] p-8 lg:p-12 border border-vulnmap-border flex flex-col items-center justify-center relative hover:border-brand-green transition-colors group cursor-pointer"
               onDragOver={(e) => e.preventDefault()}
               onDrop={handleFileDrop}
               onClick={() => document.getElementById('fileUpload').click()}>
            <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <UploadCloud className="w-16 h-16 text-gray-500 group-hover:text-brand-green transition-colors mb-6 z-10" />
            <h3 className="text-2xl font-bold mb-2 z-10">Drag & Drop</h3>
            <p className="text-gray-400 text-center mb-6 z-10">
              your package.json or click to browse
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
                      if(json.dependencies || json.devDependencies) {
                        const deps = json.dependencies || {};
                        const devDeps = json.devDependencies || {};
                        const allDeps = { ...deps, ...devDeps };
                        const parsedDeps = Object.keys(allDeps).map(name => ({
                          name,
                          version: allDeps[name].replace(/[\^~><=]/g, '').split(' ')[0],
                          type: 'npm'
                        }));
                        setPackages(parsedDeps.slice(0, 15));
                      }
                      if(json.name) setStackNameLocal(json.name);
                    } catch(err){}
                  };
                  reader.readAsText(e.target.files[0]);
                }
              }} 
            />

            {file ? (
              <div className="bg-brand-green/20 border border-brand-green text-brand-green px-6 py-2 font-mono text-sm z-10">
                ✅ Loaded: {file.name}
              </div>
            ) : (
              <div className="border border-vulnmap-border px-6 py-2 font-mono text-sm text-gray-500 z-10 bg-[#050505]">
                No file selected
              </div>
            )}
          </div>

          {/* Example Code Snippet Area */}
          <div className="bg-[#0a0a0a] p-8 border border-vulnmap-border flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-brand-green" /> What we look for
            </h3>
            <p className="text-gray-400 text-sm mb-6">We parse your dependencies and check exact versions against real CVE databases.</p>
            
            <div className="bg-[#050505] border border-vulnmap-border p-4 font-mono text-sm text-gray-300 overflow-x-auto flex-1 rounded">
              <pre>
{`{
  "name": "my-enterprise-app",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "4.17.4",     `} <span className="text-risk-critical">← High Risk (CVE-2021-23337)</span>{`
    "log4j-core": "2.14.1", `} <span className="text-risk-critical">← Critical (Log4Shell)</span>{`
    "axios": "0.21.0"       `} <span className="text-risk-high">← High Risk (SSRF)</span>{`
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Manual Entry Section (Optional) */}
        {packages.length > 0 && (
          <div className="bg-[#0a0a0a] p-6 border border-vulnmap-border mb-12">
            <h3 className="text-xl font-bold mb-4 font-mono text-brand-green">Parsed Packages ({packages.length}/15 max)</h3>
            <div className="flex flex-wrap gap-3">
              {packages.map((pkg, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#050505] border border-vulnmap-border px-4 py-2 text-sm font-mono">
                  <span>{pkg.name} <span className="text-gray-500">v{pkg.version}</span></span>
                  <X className="w-4 h-4 cursor-pointer hover:text-risk-critical transition-colors" onClick={() => handleRemovePackage(i)} />
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={handleSubmit}
          className="w-full py-5 bg-brand-green hover:bg-green-400 text-black font-mono font-bold text-xl transition-colors tracking-widest shadow-[0_0_20px_rgba(0,255,65,0.3)]"
        >
          ANALYZE VULNERABILITIES NOW →
        </button>
      </div>
    </div>
  );
};

export default InputPage;
