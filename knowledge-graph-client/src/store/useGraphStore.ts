import { create } from 'zustand';
import { NodeType } from '../types';
import { RelationshipType } from '../types';

type GraphState = {
  nodes: NodeType[];
  relationships: RelationshipType[];
  addNode: (node: NodeType) => void;
  addRelationship: (relationship: RelationshipType) => void;
  setGraphData: (nodes: NodeType[], relationships: RelationshipType[]) => void;
};

const useGraphStore = create<GraphState>((set) => ({
  nodes: [],
  relationships: [],
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
  addRelationship: (relationship) =>
    set((state) => ({
      relationships: [...state.relationships, relationship],
    })),
  setGraphData: (nodes, relationships) => set({ nodes, relationships }),
}));

export default useGraphStore;
