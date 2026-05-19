const fetch = require('node-fetch'); // we can just use native fetch in node 18+

async function callGroq(systemPrompt, userPrompt) {
  if (!process.env.GROQ_API_KEY) throw new Error('No Groq API Key');
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      max_tokens: 500,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2
    })
  });
  if (!response.ok) throw new Error(`Groq error: ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callNvidiaNim(systemPrompt, userPrompt) {
  if (!process.env.NVIDIA_NIM_API_KEY) throw new Error('No NVIDIA NIM API Key');
  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NVIDIA_NIM_API_KEY}`
    },
    body: JSON.stringify({
      model: "meta/llama3-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500,
      temperature: 0.2
    })
  });
  if (!response.ok) throw new Error(`NVIDIA NIM error: ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function orchestrateLLM(systemPrompt, userPrompt) {
  try {
    // Try NVIDIA NIM first
    console.log('Attempting inference via NVIDIA NIM (llama3-70b-instruct)...');
    return await callNvidiaNim(systemPrompt, userPrompt);
  } catch (err) {
    console.warn('NVIDIA NIM failed, falling back to Groq...', err.message);
    try {
      return await callGroq(systemPrompt, userPrompt);
    } catch (err2) {
      console.error('Both NVIDIA NIM and Groq failed:', err2.message);
      throw new Error('All AI models failed');
    }
  }
}

async function generateAttackPath(node, allNodes) {
  const cveList = node.cves.map(c => `${c.cveId}: ${c.summary}`).join('\n');
  const stackList = allNodes.map(n => `${n.id}@${n.version}`).join(', ');

  const systemPrompt = "You are a cybersecurity expert specializing in supply chain attacks. Be concise and technical.";
  const userPrompt = `A node named ${node.id} version ${node.version} has these CVEs:\n${cveList}\nIt is at trust depth ${node.trustDepth} in this tech stack: ${stackList}.\nIn 3-4 sentences, describe a realistic attack path an adversary could take if this package is compromised, mentioning specific downstream components from the stack. Then give exactly 3 bullet-point remediation steps. Format:\nATTACK PATH:\n[narrative]\n\nREMEDIATION:\n• step1\n• step2\n• step3`;

  try {
    return await orchestrateLLM(systemPrompt, userPrompt);
  } catch (error) {
    console.error('Error generating attack path:', error);
    return `ATTACK PATH:\nFailed to generate attack path due to API error. An adversary could leverage the known vulnerabilities to execute arbitrary code or exfiltrate data from the supply chain.\n\nREMEDIATION:\n• Review CVEs manually.\n• Update package immediately.\n• Audit downstream dependencies.`;
  }
}

async function generateExecutiveSummary(scan) {
  const criticalNodes = scan.nodes.filter(n => n.riskLevel === 'CRITICAL').map(n => n.id).join(', ');
  const systemPrompt = "You are a CISO writing a brief for the board.";
  const userPrompt = `This company's tech stack scan shows overall risk score ${scan.overallRiskScore}/100. Critical nodes: ${criticalNodes}. In exactly 5 sentences, summarize: what the risk is, what the worst case scenario is, and what should be done immediately. Plain English, no jargon.`;

  try {
    return await orchestrateLLM(systemPrompt, userPrompt);
  } catch (error) {
    console.error('Error generating executive summary:', error);
    return "Failed to generate executive summary due to API error. The current tech stack presents notable supply chain vulnerabilities that require immediate attention. Critical nodes must be patched or isolated to prevent potential data breaches or service disruption. A thorough manual review of the identified high-risk packages is strongly advised.";
  }
}

module.exports = { generateAttackPath, generateExecutiveSummary };
