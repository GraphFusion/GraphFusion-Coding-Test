// src/components/RelationshipForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { Relationship } from '../types';

interface RelationshipFormProps {
  onAddRelationship: (relationship: Relationship) => void;
}

const RelationshipForm: React.FC<RelationshipFormProps> = ({ onAddRelationship }) => {
  const [relationship, setRelationship] = useState<Relationship>({ from: 0, to: 0, relationship: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/add-relationship', relationship);
      onAddRelationship(response.data);  // Add the new relationship to the list
      setRelationship({ from: 0, to: 0, relationship: '' });
    } catch (error) {
      console.error("Error adding relationship:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 border rounded bg-light">
      <h3>Add Relationship</h3>
      <div className="mb-3">
        <label className="form-label">From Node ID</label>
        <input
          type="number"
          className="form-control"
          placeholder="From Node ID"
          value={relationship.from}
          onChange={(e) => setRelationship({ ...relationship, from: Number(e.target.value) })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">To Node ID</label>
        <input
          type="number"
          className="form-control"
          placeholder="To Node ID"
          value={relationship.to}
          onChange={(e) => setRelationship({ ...relationship, to: Number(e.target.value) })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Relationship</label>
        <input
          type="text"
          className="form-control"
          placeholder="Relationship"
          value={relationship.relationship}
          onChange={(e) => setRelationship({ ...relationship, relationship: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Relationship</button>
    </form>
  );
};

export default RelationshipForm;
