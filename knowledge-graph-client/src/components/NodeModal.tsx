import React, { useState } from 'react';
import useGraphStore from '../store/useGraphStore';
import Modal from './Modal';
import { postData } from '../api/apiHelper';
import { api } from '../api/backendApi';
import { ModalProps } from '../types';
import { validateField } from '../utils/errorUtils';

const NodeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const addNode = useGraphStore((state) => state.addNode);

  const [nodeName, setNodeName] = useState('');
  const [nodeType, setNodeType] = useState('');
  const [errorNodeName, setErrorNodeName] = useState('');
  const [errorNodeType, setErrorNodeType] = useState('');
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setNodeName('');
    setNodeType('');
    setErrorNodeName('');
    setErrorNodeType('');
  };

  const handleAddNode = () => {
    // Validate inputs using the utility function
    const isNodeNameValid = validateField(nodeName.trim(), 'Node Name', setErrorNodeName);
    const isNodeTypeValid = validateField(nodeType.trim(), 'Node Type', setErrorNodeType);

    if (!isNodeNameValid || !isNodeTypeValid) return;

    const newNode = {
      id: Date.now(),
      name: nodeName,
      type: nodeType,
    };

    // Use postData to send the new node to the server
    postData(
      `${api}nodes`,
      newNode,
      addNode,
      clearInputs,
      onClose,
      setLoading,
      setErrorNodeName
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Node"
      confirmText={loading ? 'Adding...' : 'Add Node'}
      onConfirm={handleAddNode}
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="nodeName">Node Name</label>
        <input
          id="nodeName"
          type="text"
          placeholder="Enter Node Name"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errorNodeName && <p className="text-red-500 mt-1">{errorNodeName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="nodeType">Node Type</label>
        <select
          id="nodeType"
          value={nodeType}
          onChange={(e) => setNodeType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Node Type</option>
          <option value="company">Company</option>
          <option value="person">Person</option>
          <option value="ngo">NGO</option>
        </select>
        {errorNodeType && <p className="text-red-500 mt-1">{errorNodeType}</p>}
      </div>
    </Modal>
  );
};

export default NodeModal;
