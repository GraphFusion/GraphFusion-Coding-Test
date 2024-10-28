// src/types.ts

export interface Node {
    id: number;
    name: string;
    type: string;
  }
  
  export interface Relationship {
    from: number;
    to: number;
    relationship: string;
  }
  