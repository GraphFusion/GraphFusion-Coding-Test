import { getDbConnection } from '../db';

export const createNode = async (name: string, type: string) => {
  const db = await getDbConnection();
  const result = await db.run(
    'INSERT INTO nodes (name, type) VALUES (?, ?)',
    [name, type]
  );
  return { id: result.lastID, name, type };
};

export const getAllNodes = async () => {
  const db = await getDbConnection();
  return db.all('SELECT * FROM nodes');
};
