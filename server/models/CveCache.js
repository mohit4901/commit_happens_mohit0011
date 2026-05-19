const mongoose = require('mongoose');

const cveCacheSchema = new mongoose.Schema({
  packageName: String,
  version: String,
  ecosystem: String,
  cves: Array,
  fetchedAt: { type: Date, default: Date.now }
});

cveCacheSchema.index({ packageName: 1, version: 1, ecosystem: 1 });
cveCacheSchema.index({ fetchedAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('CveCache', cveCacheSchema);
