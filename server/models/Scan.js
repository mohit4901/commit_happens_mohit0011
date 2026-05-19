const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  stackName: String,
  nodes: [{
    id: String,
    version: String,
    type: String,
    cves: Array,
    riskScore: Number,
    riskLevel: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'SAFE'] },
    trustDepth: Number
  }],
  edges: [{
    source: String,
    target: String,
    type: { type: String }
  }],
  overallRiskScore: Number,
  aiSummary: String,
  pdfPath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);
