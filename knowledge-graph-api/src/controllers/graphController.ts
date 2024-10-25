import { Request, Response } from 'express';
import { createNode, getAllNodes } from '../models/nodeModel';
import { createRelationship, getAllRelationships } from '../models/relationshipModel';

export const addNode = async (req: Request, res: Response): Promise<void> => {
  const { name, type } = req.body;
  if (!name || !type) {
    res.status(400).json({ message: 'Name and type are required' });
    return;
  }
  try {
    const node = await createNode(name, type);
    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ message: 'Error creating node', error });
  }
};

export const addRelationship = async (req: Request, res: Response): Promise<void> => {
  const { fromNode, toNode, relationship } = req.body;

  if (!fromNode || !toNode || !relationship) {
    res.status(400).json({ message: 'FromNode, ToNode, and relationship are required' });
    return;
  }

  try {
    const rel = await createRelationship(fromNode, toNode, relationship);
    res.status(201).json(rel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating relationship', error });
  }
};

export const getGraphData = async (req: Request, res: Response) => {
  const nodes = await getAllNodes();
  const relationships = await getAllRelationships();
  res.status(200).json({ nodes, relationships });
};
