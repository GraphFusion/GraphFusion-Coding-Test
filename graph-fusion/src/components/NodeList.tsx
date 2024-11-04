// src/components/NodeList.tsx

import React from 'react';
import { Node } from '../types';

interface NodeListProps {
  nodes: Node[];
}

const NodeList: React.FC<NodeListProps> = ({ nodes }) => {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          {node.name} ({node.type})
        </li>
      ))}
    </ul>
  );
};

export default NodeList;
