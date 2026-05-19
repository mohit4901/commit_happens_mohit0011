function calculateNodeRisk(cves, trustDepth) {
  if (!cves || cves.length === 0) {
    return { riskScore: 0, riskLevel: 'SAFE' };
  }

  let maxCveScore = 0;
  for (let cve of cves) {
    if (cve.score > maxCveScore) {
      maxCveScore = cve.score;
    }
  }

  let riskScore = Math.floor((maxCveScore * 8) + (trustDepth * 5));
  if (riskScore > 100) riskScore = 100;

  let riskLevel = 'SAFE';
  if (riskScore >= 80) riskLevel = 'CRITICAL';
  else if (riskScore >= 60) riskLevel = 'HIGH';
  else if (riskScore >= 40) riskLevel = 'MEDIUM';
  else if (riskScore >= 20) riskLevel = 'LOW';

  return { riskScore, riskLevel };
}

module.exports = { calculateNodeRisk };
