import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const getDbConnection = async () => {
  return open({
    filename: './knowledge-graph.db',
    driver: sqlite3.Database
  });
};

export const initializeDb = async () => {
  const db = await getDbConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT
    );

    CREATE TABLE IF NOT EXISTS relationships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fromNode INTEGER,
      toNode INTEGER,
      relationship TEXT,
      FOREIGN KEY(fromNode) REFERENCES nodes(id),
      FOREIGN KEY(toNode) REFERENCES nodes(id)
    );
  `);
};
