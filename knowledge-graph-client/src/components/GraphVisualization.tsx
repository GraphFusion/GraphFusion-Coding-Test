import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import useGraphStore from '../store/useGraphStore';
import NodeModal from './NodeModal';
import RelationshipModal from './RelationshipModal';
import { NodeType } from '../types';

// Define the LinkType interface for D3 links
interface LinkType {
  source: NodeType;
  target: NodeType;
  relationship: string;
}

const GraphVisualization: React.FC = () => {
  const nodes = useGraphStore((state) => state.nodes);
  const relationships = useGraphStore((state) => state.relationships);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [isNodeModalOpen, setNodeModalOpen] = useState(false);
  const [isRelationshipModalOpen, setRelationshipModalOpen] = useState(false);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create link data with references to source and target nodes
    const links: LinkType[] = relationships
      .map((rel) => {
        const sourceNode = nodes.find((node) => node.id === rel.fromNode);
        const targetNode = nodes.find((node) => node.id === rel.toNode);
        // Only return links if both nodes are found
        if (sourceNode && targetNode) {
          return {
            source: sourceNode,
            target: targetNode,
            relationship: rel.relationship,
          };
        }
        return null;
      })
      .filter((link): link is LinkType => link !== null);

    // Create the simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).distance(200).id((d) => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(400, 300));

    // Render links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', '#aaa')
      .style('stroke-width', 2);

    // Render labels on links to show relationship type
    const linkLabels = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('font-size', 10)
      .attr('dy', -5)
      .attr('text-anchor', 'middle')
      .text((d) => d.relationship);

    // Render nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 12)
      .style('fill', 'lightblue')
      .call(
        d3
          .drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Render labels for nodes
    const labels = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((d) => d.name)
      .attr('font-size', 12)
      .attr('dx', 14)
      .attr('dy', 4);

    // Update positions on each simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      linkLabels
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });
  }, [nodes, relationships]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Knowledge Graph</h1>
      <div className="flex justify-between w-1/2 p-4">
        <button onClick={() => setNodeModalOpen(true)} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
          Add Node
        </button>
        <button onClick={() => setRelationshipModalOpen(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add Relationship
        </button>
      </div>
      <svg ref={svgRef} width={800} height={600}></svg>
      <NodeModal isOpen={isNodeModalOpen} onClose={() => setNodeModalOpen(false)} />
      <RelationshipModal isOpen={isRelationshipModalOpen} onClose={() => setRelationshipModalOpen(false)} />
    </div>
  );
};

export default GraphVisualization;
