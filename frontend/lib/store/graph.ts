import { create } from 'zustand'
import * as d3 from 'd3'

interface Node extends d3.SimulationNodeDatum {
  id: number
  name: string
  type: string
}

interface Relationship {
  id: number
  from_node: number
  to_node: number
  relationship: string
}

interface GraphStore {
  nodes: Node[]
  relationships: Relationship[]
  addNode: (node: Node) => void
  addRelationship: (relationship: Relationship) => void
  fetchGraph: () => Promise<void>
}

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  relationships: [],
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  addRelationship: (relationship) => set((state) => ({ 
    relationships: [...state.relationships, relationship] 
  })),
  fetchGraph: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graph`)
      const data = await response.json()
      set({ nodes: data.nodes, relationships: data.relationships })
    } catch (error) {
      console.error('Failed to fetch graph data:', error)
    }
  }
}))
