// src/components/NodeForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { Node } from '../types';

interface NodeFormProps {
  onAddNode: (node: Node) => void;
}

const NodeForm: React.FC<NodeFormProps> = ({ onAddNode }) => {
  const [node, setNode] = useState<Node>({ id: 0, name: '', type: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/add-node', node);
      onAddNode(response.data);  // Add the new node to the list
      setNode({ id: 0, name: '', type: '' });
    } catch (error) {
      console.error("Error adding node:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 border rounded bg-light">
      <h3>Add Node</h3>
      <div className="mb-3">
        <label className="form-label">ID</label>
        <input
          type="number"
          className="form-control"
          placeholder="ID"
          value={node.id}
          onChange={(e) => setNode({ ...node, id: Number(e.target.value) })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={node.name}
          onChange={(e) => setNode({ ...node, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Type</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          value={node.type}
          onChange={(e) => setNode({ ...node, type: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Node</button>
    </form>
  );
};

export default NodeForm;
