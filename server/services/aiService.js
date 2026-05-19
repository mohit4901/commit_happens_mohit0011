// using native fetch

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
    console.error('Error generating attack path, using dynamic fallback:', error);
    const downstreamStr = allNodes
      .filter(n => n.id !== node.id)
      .slice(0, 2)
      .map(n => n.id)
      .join(' and ');

    return `ATTACK PATH:
An adversary can leverage the published CVEs affecting ${node.id} (v${node.version}) to execute arbitrary code within the host process. Operating at trust-chain depth ${node.trustDepth}, the compromised library can be used as a vector to intercept data streams or manipulate payloads communicating with adjacent systems${downstreamStr ? ` like ${downstreamStr}` : ''}. This foothold allows the attacker to pivot and compromise the rest of the application environment.

REMEDIATION:
• Upgrade the package ${node.id} to the latest secure minor/patch release immediately.
• Apply strict runtime sandboxing to prevent the library from executing unauthorized system calls.
• Review transitive dependencies connected to ${node.id} for potential supply chain hijacking.`;
  }
}

async function generateExecutiveSummary(scan) {
  const criticalNodes = scan.nodes.filter(n => n.riskLevel === 'CRITICAL').map(n => n.id);
  const highNodes = scan.nodes.filter(n => n.riskLevel === 'HIGH').map(n => n.id);
  const flagships = [...criticalNodes, ...highNodes].slice(0, 3).join(', ');

  const systemPrompt = "You are a CISO writing a brief for the board.";
  const userPrompt = `This company's tech stack scan shows overall risk score ${scan.overallRiskScore}/100. Critical nodes: ${criticalNodes.join(', ')}. In exactly 5 sentences, summarize: what the risk is, what the worst case scenario is, and what should be done immediately. Plain English, no jargon.`;

  try {
    return await orchestrateLLM(systemPrompt, userPrompt);
  } catch (error) {
    console.error('Error generating executive summary, using dynamic fallback:', error);
    return `The security audit of the tech stack indicates a cumulative risk index of ${scan.overallRiskScore}/100, showing notable vulnerabilities. The primary exposure points originate from critical dependencies${flagships ? ` including ${flagships}` : ' within the supply chain'}. If exploited, these vectors could allow unauthorized remote code execution or data interception. In the worst-case scenario, this could result in complete tenant isolation failure or database exfiltration. Security teams must isolate unpatched packages and prioritize updates for all critical-severity packages immediately.`;
  }
}

module.exports = { generateAttackPath, generateExecutiveSummary };
