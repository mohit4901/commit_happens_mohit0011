const { fetchCves } = require('./cveService');
const { calculateNodeRisk } = require('./riskService');

async function buildGraph(packages) {
  const nodes = [];
  const edges = [];
  let totalScore = 0;

  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    const cves = await fetchCves(pkg.name, pkg.version, pkg.type || pkg.ecosystem);
    const trustDepth = i + 1;
    const { riskScore, riskLevel } = calculateNodeRisk(cves, trustDepth);

    nodes.push({
      id: pkg.name,
      version: pkg.version,
      type: pkg.type || pkg.ecosystem,
      cves,
      riskScore,
      riskLevel,
      trustDepth
    });

    totalScore += riskScore;

    if (i > 0) {
      edges.push({
        source: packages[i - 1].name,
        target: pkg.name,
        type: 'dependency'
      });
    }
  }

  const overallRiskScore = packages.length > 0 ? Math.floor(totalScore / packages.length) : 0;

  return { nodes, edges, overallRiskScore };
}

module.exports = { buildGraph };
