async function generateAttackPath(node, allNodes) {
  const cveList = node.cves.map(c => `${c.cveId}: ${c.summary}`).join('\n');
  const stackList = allNodes.map(n => `${n.id}@${n.version}`).join(', ');

  const systemPrompt = "You are a cybersecurity expert specializing in supply chain attacks. Be concise and technical.";
  const userPrompt = `A node named ${node.id} version ${node.version} has these CVEs:\n${cveList}\nIt is at trust depth ${node.trustDepth} in this tech stack: ${stackList}.\nIn 3-4 sentences, describe a realistic attack path an adversary could take if this package is compromised, mentioning specific downstream components from the stack. Then give exactly 3 bullet-point remediation steps. Format:\nATTACK PATH:\n[narrative]\n\nREMEDIATION:\n• step1\n• step2\n• step3`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });
    
    if (!response.ok) {
        throw new Error('AI API Error');
    }
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error generating attack path:', error);
    return `ATTACK PATH:\nFailed to generate attack path due to API error. An adversary could leverage the known vulnerabilities to execute arbitrary code or exfiltrate data from the supply chain.\n\nREMEDIATION:\n• Review CVEs manually.\n• Update package immediately.\n• Audit downstream dependencies.`;
  }
}

async function generateExecutiveSummary(scan) {
  const criticalNodes = scan.nodes.filter(n => n.riskLevel === 'CRITICAL').map(n => n.id).join(', ');
  const prompt = `You are a CISO writing a brief for the board. This company's tech stack scan shows overall risk score ${scan.overallRiskScore}/100. Critical nodes: ${criticalNodes}. In exactly 5 sentences, summarize: what the risk is, what the worst case scenario is, and what should be done immediately. Plain English, no jargon.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
        throw new Error('AI API Error');
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error generating executive summary:', error);
    return "Failed to generate executive summary due to API error. The current tech stack presents notable supply chain vulnerabilities that require immediate attention. Critical nodes must be patched or isolated to prevent potential data breaches or service disruption. A thorough manual review of the identified high-risk packages is strongly advised.";
  }
}

module.exports = { generateAttackPath, generateExecutiveSummary };
