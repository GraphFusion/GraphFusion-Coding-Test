// src/App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NodeForm from './components/NodeForm';
import RelationshipForm from './components/RelationshipForm';
import NodeList from './components/NodeList';
import { Node, Relationship } from './types';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodesRes = await axios.get<Node[]>('http://127.0.0.1:5000/add-node');
        const relationshipsRes = await axios.get<Relationship[]>('http://127.0.0.1:5000/add-relationships');
        setNodes(nodesRes.data);
        setRelationships(relationshipsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addNode = (node: Node) => setNodes([...nodes, node]);
  const addRelationship = (relationship: Relationship) => setRelationships([...relationships, relationship]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Knowledge Graph</h1>
      <div className="row">
        <div className="col-md-6">
          <NodeForm onAddNode={addNode} />
        </div>
        <div className="col-md-6">
          <RelationshipForm onAddRelationship={addRelationship} />
        </div>
      </div>
      <h2>Nodes</h2>
      <NodeList nodes={nodes} />
      <h2>Relationships</h2>
      <ul>
        {relationships.map((r, index) => (
          <li key={index}>
            {r.from} - {r.relationship} - {r.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
