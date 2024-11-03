import { useEffect, useState } from 'react';
import { api } from '../api/backendApi';
import { NodeType } from '../types';

const useFetchNodes = (isOpen: boolean) => {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchNodes = async () => {
        try {
          const response = await fetch(`${api}graph`);
          if (!response.ok) {
            throw new Error('Failed to fetch nodes');
          }
          const data = await response.json();
          setNodes(data.nodes);
        } catch (error) {
          console.error('Error fetching nodes:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      };

      fetchNodes();
    }
  }, [isOpen]);

  return { nodes, error };
};

export default useFetchNodes;
