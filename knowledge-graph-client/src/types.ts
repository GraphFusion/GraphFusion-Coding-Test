export type NodeType = {
  id: number;
  name: string;
  type: string;

  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

export type RelationshipType = {
  id: number;
  fromNode: number;
  toNode: number;
  relationship: string;

  source?: number;
  target?: number;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};