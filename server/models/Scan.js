const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  stackName: String,
  nodes: { type: mongoose.Schema.Types.Mixed, default: [] },
  edges: { type: mongoose.Schema.Types.Mixed, default: [] },
  overallRiskScore: Number,
  aiSummary: String,
  pdfPath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);
