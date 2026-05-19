import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceGraph = ({ nodes, edges, onNodeClick, selectedNodeId }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!nodes || nodes.length === 0 || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(containerRef.current)
      .html('') 
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#050505');

    // Add glowing filter for critical/high nodes
    const defs = svg.append('defs');
    
    // Glow filter definition
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
      
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '6')
      .attr('result', 'blur');
      
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Arrowhead marker definition
    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28) // Shift to make arrowhead sit on circle boundary
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#374151');

    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (e) => g.attr('transform', e.transform));
      
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(width/2, height/2).scale(0.85).translate(-width/2, -height/2));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(140))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(60));

    const colorMap = {
      CRITICAL: '#DC2626',
      HIGH: '#F97316',
      MEDIUM: '#EAB308',
      LOW: '#22C55E',
      SAFE: '#10B981'
    };

    // Edge Links
    const link = g.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    // Node Groups
    const nodeGroup = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', (e, d) => {
          if (!e.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (e, d) => {
          d.fx = e.x; d.fy = e.y;
        })
        .on('end', (e, d) => {
          if (!e.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
      )
      .on('click', (e, d) => onNodeClick(d));

    // Glow ring for Critical / High risk
    nodeGroup.append('circle')
      .attr('r', d => Math.max(24, Math.min(50, d.riskScore / 2 + 18)))
      .attr('fill', 'transparent')
      .attr('stroke', d => colorMap[d.riskLevel] || colorMap.SAFE)
      .attr('stroke-width', d => (d.riskLevel === 'CRITICAL' || d.riskLevel === 'HIGH') ? 3 : 0)
      .attr('filter', d => (d.riskLevel === 'CRITICAL' || d.riskLevel === 'HIGH') ? 'url(#glow)' : null)
      .style('opacity', 0.6)
      .attr('class', 'animate-pulse');

    // Solid Node Circle
    nodeGroup.append('circle')
      .attr('r', d => Math.max(20, Math.min(45, d.riskScore / 2 + 15)))
      .attr('fill', d => d.id === selectedNodeId ? '#050505' : '#0a0a0a')
      .attr('stroke', d => colorMap[d.riskLevel] || colorMap.SAFE)
      .attr('stroke-width', d => d.id === selectedNodeId ? 4 : 2)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease');

    // Risk Score Text
    nodeGroup.append('text')
      .text(d => d.riskScore)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', d => colorMap[d.riskLevel] || colorMap.SAFE)
      .attr('font-family', 'Space Mono, monospace')
      .attr('font-weight', 'bold')
      .attr('font-size', '16px')
      .style('pointer-events', 'none');

    // Package Name Label
    nodeGroup.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', d => Math.max(20, Math.min(45, d.riskScore / 2 + 15)) + 18)
      .attr('fill', '#ffffff')
      .attr('font-family', 'Space Mono, monospace')
      .attr('font-size', '11px')
      .attr('letter-spacing', '0.05em')
      .style('pointer-events', 'none');

    // Highlight connections on hover
    nodeGroup.on('mouseover', (e, d) => {
      // Find connected nodes
      const connectedNodeIds = new Set();
      connectedNodeIds.add(d.id);
      
      edges.forEach(edge => {
        if (edge.source.id === d.id) connectedNodeIds.add(edge.target.id);
        if (edge.target.id === d.id) connectedNodeIds.add(edge.source.id);
      });

      // Dim all nodes except connected
      nodeGroup.style('opacity', n => connectedNodeIds.has(n.id) ? 1.0 : 0.15);
      
      // Dim all edges except connected
      link
        .attr('stroke', edge => (edge.source.id === d.id || edge.target.id === d.id) ? '#00FF41' : '#1f2937')
        .attr('stroke-width', edge => (edge.source.id === d.id || edge.target.id === d.id) ? 3 : 2);
    });

    nodeGroup.on('mouseout', () => {
      nodeGroup.style('opacity', 1.0);
      link.attr('stroke', '#1f2937').attr('stroke-width', 2);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, selectedNodeId]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ForceGraph;
