import React, { useState } from 'react';
import useGraphStore from '../store/useGraphStore';
import Modal from './Modal';
import { postData } from '../api/apiHelper';
import useFetchNodes from '../hook/useFetchNodes';
import { api } from '../api/backendApi';
import { ModalProps } from '../types';
import { validateField } from '../utils/errorUtils';

const RelationshipModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const addRelationship = useGraphStore((state) => state.addRelationship);

  const { nodes, error: fetchNodesError } = useFetchNodes(isOpen);
  const [fromNode, setFromNode] = useState<number | ''>('');
  const [toNode, setToNode] = useState<number | ''>('');
  const [relationship, setRelationship] = useState('');
  const [errorFromNode, setErrorFromNode] = useState('');
  const [errorToNode, setErrorToNode] = useState('');
  const [errorRelationship, setErrorRelationship] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddRelationship = () => {
    // Clear previous error messages
    setErrorFromNode('');
    setErrorToNode('');
    setErrorRelationship('');

    // Validate fields using the utility function
    const isFromNodeValid = validateField(fromNode, 'From Node', setErrorFromNode);
    const isToNodeValid = validateField(toNode, 'To Node', setErrorToNode);
    const isRelationshipValid = validateField(relationship.trim(), 'Relationship', setErrorRelationship);

    if (!isFromNodeValid || !isToNodeValid || !isRelationshipValid) return;

    setLoading(true);

    // Create the new relationship object
    const newRelationship = {
      id: Date.now(),
      fromNode,
      toNode,
      relationship,
    };

    // Use postData to send the new relationship to the server
    postData(
      `${api}relationships`,
      newRelationship,
      addRelationship,
      () => {
        setFromNode('');
        setToNode('');
        setRelationship('');
        onClose();
      },
      onClose,
      setLoading,
      setErrorFromNode
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Relationship"
      confirmText={loading ? 'Adding...' : 'Add Relationship'}
      onConfirm={handleAddRelationship}
    >
      {fetchNodesError && <p className="text-red-500">{fetchNodesError}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="fromNode">From Node</label>
        <select
          id="fromNode"
          value={fromNode}
          onChange={(e) => setFromNode(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select From Node</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name} ({node.type})
            </option>
          ))}
        </select>
        {errorFromNode && <p className="text-red-500 mt-1">{errorFromNode}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="toNode">To Node</label>
        <select
          id="toNode"
          value={toNode}
          onChange={(e) => setToNode(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select To Node</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name} ({node.type})
            </option>
          ))}
        </select>
        {errorToNode && <p className="text-red-500 mt-1">{errorToNode}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="relationship">Relationship</label>
        <input
          id="relationship"
          type="text"
          placeholder="Enter Relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errorRelationship && <p className="text-red-500 mt-1">{errorRelationship}</p>}
      </div>
    </Modal>
  );
};

export default RelationshipModal;
