# VulnMap 

> **"Find your company's weakest link in under 30 seconds."**

A supply chain vulnerability visualizer for security teams. Paste your tech stack or upload a JSON/SBOM file — VulnMap fetches real CVE data from NVD and OSV, builds an interactive dependency graph, scores your risk, and generates an AI-powered attack path narrative with a prioritized remediation report.

---


## The Problem

Modern companies are breached not through their own systems — but through trusted third-party vendors. A single compromised npm package, SaaS integration, or cloud sub-processor can cascade into a full organizational breach.

Security teams have no unified view of how vendor dependencies interconnect and where the weakest links are.

**VulnMap fixes this.**

---

## Architecture

```
React + D3.js (Vercel)
    │
    ├── POST /api/scan          → Parse stack, fetch CVEs, build graph, save to DB
    ├── POST /api/ai/attack     → AI attack path narrative for a given node
    ├── GET  /api/scan/:id      → Return graph data for visualization
    └── POST /api/report/export → Generate PDF risk report (pdfkit)

External: NVD API (nvd.nist.gov) + OSV.dev API (free, no key needed)
Cache: MongoDB Atlas (CVE responses cached to avoid rate limits)
```

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Tailwind CSS | Fast, responsive |
| Graph | D3.js (force-directed) | Interactive node graph |
| Backend | Node.js + Express.js | REST API |
| Database | MongoDB Atlas | Scan + CVE cache storage |
| CVE Data | NVD API + OSV.dev | Free, real vulnerability data |
| AI | Claude API / GPT-4o | Attack path + risk narrative |
| PDF | pdfkit | Exportable risk report |
| File Upload | multer | JSON/SBOM file handling |
| Deploy FE | Vercel | Free, instant |
| Deploy BE | Railway | Free, GitHub auto-deploy |

---

## Folder Structure

```
vulnmap/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── InputPage.jsx        # Manual entry + JSON upload
│   │   │   ├── GraphView.jsx        # D3.js force graph (MAIN PAGE)
│   │   │   └── ExportReport.jsx
│   │   ├── components/
│   │   │   ├── ForceGraph.jsx       # D3 graph component
│   │   │   ├── NodeDetailPanel.jsx  # Slide-in CVE + AI panel
│   │   │   ├── RiskBadge.jsx
│   │   │   └── UploadZone.jsx
│   │   ├── context/
│   │   │   └── ScanContext.jsx
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── routes/
│   │   ├── scan.js                  # POST /api/scan
│   │   ├── aiAttack.js              # POST /api/ai/attack
│   │   └── report.js                # POST /api/report/export
│   ├── models/
│   │   ├── Scan.js
│   │   └── CveCache.js
│   ├── services/
│   │   ├── cveService.js            # NVD + OSV fetch + cache
│   │   ├── graphService.js          # Build graph nodes/edges
│   │   ├── riskService.js           # Risk score calculation
│   │   ├── aiService.js             # AI attack path call
│   │   └── pdfService.js            # pdfkit report
│   ├── middleware/
│   │   └── upload.js                # multer config
│   └── index.js
│
├── demo/
│   └── sample-stack.json            # Pre-seeded demo with real CVEs
├── .env.example
└── README.md
```

---

## MongoDB Schema

### scans collection
```json
{
  "_id": "ObjectId",
  "stackName": "My Company Stack",
  "nodes": [
    {
      "id": "lodash",
      "version": "4.17.4",
      "type": "npm",
      "cves": ["CVE-2019-10744", "CVE-2020-8203"],
      "riskScore": 87,
      "riskLevel": "CRITICAL",
      "trustDepth": 2
    }
  ],
  "edges": [
    { "source": "express", "target": "lodash", "type": "dependency" }
  ],
  "overallRiskScore": 74,
  "createdAt": "timestamp"
}
```

### cveCache collection
```json
{
  "packageName": "lodash",
  "version": "4.17.4",
  "cves": [...],
  "fetchedAt": "timestamp",
  "ttl": 86400
}
```

---

## Risk Score Formula

```
Node Risk Score = (CVE Base Score × 10) + (Trust Depth × 5) + (Breach History × 15)
Overall Risk    = weighted average of all node scores
Priority        = sort by score DESC → top 3 = immediate remediation
```

---

## Demo JSON — sample-stack.json

```json
{
  "stackName": "Demo Company Stack",
  "packages": [
    { "name": "lodash", "version": "4.17.4", "type": "npm" },
    { "name": "axios", "version": "0.21.0", "type": "npm" },
    { "name": "express", "version": "4.16.0", "type": "npm" },
    { "name": "log4j", "version": "2.14.0", "type": "java" },
    { "name": "django", "version": "3.0.0", "type": "pypi" }
  ]
}
```

---

## Scalability Roadmap

```
Phase 1 (MVP)      → Manual JSON/SBOM upload, web dashboard
Phase 2 (3 months) → GitHub repo connect (auto-scan package.json)
Phase 3 (6 months) → CI/CD pipeline integration (GitHub Actions)
Phase 4 (1 year)   → Real-time monitoring + Slack/email breach alerts
Phase 5 (2 years)  → Enterprise API for SOC teams, govt/defence tenders
```

---

## Business Model

| Tier | Price | Features |
|---|---|---|
| Free | $0 | 1 scan/day, 20 nodes, basic graph |
| Pro | $39/month | Unlimited scans, PDF export, team dashboard |
| Enterprise | Custom | CI/CD integration, Slack alerts, white-label |
| Govt / Defence | Tender | On-premise deploy, compliance reports |

---

## Judging Criteria Coverage

| Criteria | How VulnMap addresses it |
|---|---|
| Innovation | AI attack path simulation + D3 trust-chain graph — no other team will build this combination |
| UI/UX | Interactive force graph, click-to-explore nodes, dark cybersecurity theme, smooth animations |
| Impact | Real CVE data from NVD/OSV. SolarWinds, Log4j style attacks visualized live. |
| Hosted Prototype | Live on Vercel + Railway with demo JSON preloaded |
| Business Model | Freemium → Pro SaaS → Enterprise API → Govt tender. Clear at every stage. |

---

## How to Run Locally

```bash
git clone https://github.com/mohit4901/commit_happens_mohit0011
cd commit_happens_mohit0011

# Backend
cd server && npm install
cp .env.example .env    # Fill MONGO_URI, ANTHROPIC_API_KEY
node index.js

# Frontend
cd ../client && npm install
npm run dev
```

---

*Built at Commit Happens Hackathon*
