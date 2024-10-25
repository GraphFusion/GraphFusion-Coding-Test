import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const GraphFusion = () => {
  const [nodes, setNodes] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [node, setNode] = useState({ id: '', name: '', type: '' });
  const [relationship, setRelationship] = useState({ from: '', to: '', relationship: '' });

  const fetchGraphData = async () => {
    const response = await axios.get('http://localhost:5000/graph');
    setNodes(response.data.nodes);
    setRelationships(response.data.relationships);
    drawGraph(response.data.nodes, response.data.relationships);
  };

  const addNode = async () => {
    await axios.post('http://localhost:5000/add-node', node);
    fetchGraphData();
  };

  const addRelationship = async () => {
    await axios.post('http://localhost:5000/add-relationship', relationship);
    fetchGraphData();
  };

  const drawGraph = (nodes, relationships) => {
    const svg = d3.select('svg');
    svg.selectAll('*').remove();

    const link = svg.append('g')
      .selectAll('line')
      .data(relationships)
      .enter()
      .append('line')
      .style('stroke', '#aaa');

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', 'blue');

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(relationships).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(300, 200));

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <div>
      <div>
        <input placeholder="Node ID" onChange={e => setNode({ ...node, id: e.target.value })} />
        <input placeholder="Node Name" onChange={e => setNode({ ...node, name: e.target.value })} />
        <input placeholder="Node Type" onChange={e => setNode({ ...node, type: e.target.value })} />
        <button onClick={addNode}>Add Node</button>
      </div>

      <div>
        <input placeholder="From Node ID" onChange={e => setRelationship({ ...relationship, from: e.target.value })} />
        <input placeholder="To Node ID" onChange={e => setRelationship({ ...relationship, to: e.target.value })} />
        <input placeholder="Relationship" onChange={e => setRelationship({ ...relationship, relationship: e.target.value })} />
        <button onClick={addRelationship}>Add Relationship</button>
      </div>

      <svg width="600" height="400"></svg>
    </div>
  );
};

export default GraphFusion;
