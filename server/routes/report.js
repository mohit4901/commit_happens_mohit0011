const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');
const { generatePdfReport } = require('../services/pdfService');

router.post('/export', async (req, res) => {
  try {
    const { scanId } = req.body;
    
    if (!scanId) {
      return res.status(400).json({ success: false, error: 'scanId is required' });
    }

    const scan = await Scan.findById(scanId);
    if (!scan) return res.status(404).json({ success: false, error: 'Scan not found' });

    const pdfUrl = await generatePdfReport(scan);
    
    scan.pdfPath = pdfUrl;
    await scan.save();

    res.json({ success: true, pdfUrl });
  } catch (error) {
    console.error('Report Generation Error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate report' });
  }
});

module.exports = router;
