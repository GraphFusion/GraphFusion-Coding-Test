import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphRoutes from './routes/graphRoutes';
import { initializeDb } from './db';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', graphRoutes);

initializeDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error initializing the database:', err);
});
