import { getDbConnection } from '../db';

export const createRelationship = async (fromNode: number, toNode: number, relationship: string) => {
  const db = await getDbConnection();
  const result = await db.run(
    'INSERT INTO relationships (fromNode, toNode, relationship) VALUES (?, ?, ?)',
    [fromNode, toNode, relationship]
  );
  return { id: result.lastID, fromNode, toNode, relationship };
};

export const getAllRelationships = async () => {
  const db = await getDbConnection();
  return db.all('SELECT * FROM relationships');
};
