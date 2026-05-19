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
      .attr('height', height);

    const g = svg.append('g');

    const zoom = d3.zoom().on('zoom', (e) => g.attr('transform', e.transform));
    svg.call(zoom);
    
    svg.call(zoom.transform, d3.zoomIdentity.translate(width/2, height/2).scale(0.8).translate(-width/2, -height/2));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(50));

    const colorMap = {
      CRITICAL: '#DC2626',
      HIGH: '#F97316',
      MEDIUM: '#EAB308',
      LOW: '#22C55E',
      SAFE: '#6B7280'
    };

    const link = g.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#374151')
      .attr('stroke-width', 1.5);

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

    nodeGroup.append('circle')
      .attr('r', d => Math.max(20, Math.min(50, d.riskScore / 2 + 15)))
      .attr('fill', d => colorMap[d.riskLevel] || colorMap.SAFE)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .attr('class', d => d.id === selectedNodeId ? 'animate-pulse scale-110' : 'transition-transform');

    nodeGroup.append('text')
      .text(d => d.riskScore)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', '#ffffff')
      .attr('font-weight', 'bold')
      .attr('font-size', '14px')
      .style('pointer-events', 'none');

    nodeGroup.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', d => Math.max(20, Math.min(50, d.riskScore / 2 + 15)) + 15)
      .attr('fill', '#ffffff')
      .attr('font-size', '11px')
      .style('pointer-events', 'none');

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
