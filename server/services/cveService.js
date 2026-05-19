const CveCache = require('../models/CveCache');

async function fetchCves(packageName, version, ecosystem) {
  try {
    const cached = await CveCache.findOne({ packageName, version, ecosystem });
    if (cached) {
      const isExpired = (Date.now() - new Date(cached.fetchedAt).getTime()) > 86400 * 1000;
      if (!isExpired) {
        return cached.cves;
      }
    }

    const response = await fetch('https://api.osv.dev/v1/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ version, package: { name: packageName, ecosystem } })
    });

    if (!response.ok) {
      throw new Error(`OSV API returned ${response.status}`);
    }

    const data = await response.json();
    let cves = [];
    if (data.vulns) {
      cves = data.vulns.map(vuln => {
        let score = 0;
        let severity = 'UNKNOWN';
        if (vuln.severity && vuln.severity.length > 0) {
          const cvss = vuln.severity.find(s => s.type === 'CVSS_V3');
          if (cvss) {
            score = parseFloat(cvss.score) || 0; 
            severity = 'HIGH';
          }
        }
        if (vuln.database_specific && vuln.database_specific.cvss) {
          score = vuln.database_specific.cvss.score || score;
          severity = vuln.database_specific.cvss.severity || severity;
        }

        return {
          cveId: vuln.id,
          summary: vuln.summary || vuln.details || 'No description available',
          severity: severity,
          score: score > 0 ? score : (vuln.id.includes('CVE') ? 7.5 : 5.0) 
        };
      });
    }

    if (cached) {
      await CveCache.updateOne({ _id: cached._id }, { cves, fetchedAt: Date.now() });
    } else {
      await CveCache.create({ packageName, version, ecosystem, cves });
    }

    return cves;
  } catch (error) {
    console.error(`Error fetching CVEs for ${packageName}@${version}:`, error.message);
    return [];
  }
}

module.exports = { fetchCves };
