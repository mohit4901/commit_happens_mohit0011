const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');
const { generateAttackPath } = require('../services/aiService');

router.post('/attack', async (req, res) => {
  try {
    const { scanId, nodeId } = req.body;
    
    if (!scanId || !nodeId) {
      return res.status(400).json({ success: false, error: 'scanId and nodeId are required' });
    }

    const scan = await Scan.findById(scanId);
    if (!scan) return res.status(404).json({ success: false, error: 'Scan not found' });

    const node = scan.nodes.find(n => n.id === nodeId);
    if (!node) return res.status(404).json({ success: false, error: 'Node not found in scan' });

    const attackPath = await generateAttackPath(node, scan.nodes);
    
    res.json({ success: true, attackPath });
  } catch (error) {
    console.error('AI Attack Error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate attack path' });
  }
});

module.exports = router;
