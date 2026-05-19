const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Scan = require('../models/Scan');
const { buildGraph } = require('../services/graphService');
const { generateExecutiveSummary } = require('../services/aiService');

router.post('/', upload.single('file'), async (req, res) => {
  try {
    let stackName = 'Uploaded Stack';
    let packages = [];

    if (req.file) {
      const fileData = JSON.parse(req.file.buffer.toString());
      stackName = fileData.stackName || fileData.name || stackName;
      packages = fileData.packages || fileData.dependencies || [];
      if (!Array.isArray(packages) && typeof packages === 'object') {
        const deps = fileData.dependencies || {};
        const devDeps = fileData.devDependencies || {};
        const allDeps = { ...deps, ...devDeps };
        packages = Object.keys(allDeps).map(name => ({
          name,
          version: allDeps[name].replace(/[\^~><=]/g, '').split(' ')[0], // clear semver
          type: 'npm'
        }));
      }
    } else if (req.body.packages) {
      stackName = req.body.stackName || stackName;
      packages = typeof req.body.packages === 'string' ? JSON.parse(req.body.packages) : req.body.packages;
    }

    if (!packages || packages.length === 0) {
      return res.status(400).json({ success: false, error: 'No packages provided' });
    }

    const { nodes, edges, overallRiskScore } = await buildGraph(packages);
    const tempScan = { nodes, overallRiskScore };
    const aiSummary = await generateExecutiveSummary(tempScan);

    const scan = new Scan({
      stackName,
      nodes,
      edges,
      overallRiskScore,
      aiSummary
    });
    
    await scan.save();

    res.json({
      success: true,
      scanId: scan._id,
      graph: { nodes, edges },
      overallRiskScore,
      aiSummary
    });

  } catch (error) {
    console.error('Scan Error:', error);
    res.status(500).json({ success: false, error: 'Failed to process scan' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) return res.status(404).json({ success: false, error: 'Scan not found' });
    res.json({ success: true, data: scan });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
