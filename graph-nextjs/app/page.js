"use client"
import { useEffect, useState } from 'react';
import NodeForm from '../components/NodeForm';
import RelationshipForm from '../components/RelationshipForm';
import GraphVisualization from '../components/GraphVisualization';
import { fetchGraphData } from '../utils/api';

const Home = () => {
  const [nodes, setNodes] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const fetchData = async () => {
    const { data } = await fetchGraphData();
    setNodes(data.nodes);
    setRelationships(data.relationships);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className='text-3xl font-bold text-center mb-6 text-black'>Graph Management</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
      <NodeForm onNodeAdded={fetchData} />
      <RelationshipForm nodes={nodes} onRelationshipAdded={fetchData} />
      </div>
      <h2 className='text-3xl font-bold mb-6 text-black'>Graph Visualization</h2>
      <GraphVisualization nodes={nodes} relationships={relationships} />
    </div>
  );
};

export default Home;
