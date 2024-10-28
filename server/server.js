import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodeRoute from './routes/NodeRouter.js';
import relationshipRoute from './routes/RelationshipsRouter.js';

dotenv.config ();

// Initiate server
const app = express ();

// Connect to db
const URL = process.env.DB_URI;
mongoose
  .connect (URL)
  .then (() => {
    console.log ('Successful connection to DB');
  })
  .catch (err => {
    console.log (err);
    console.log ('Connection to DB failed');
  });

//Middlewares
app.use (express.json ());
app.use (
  cors ({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://graphfusion-coding-test-1.onrender.com' // Your frontend Render URL
      : 'http://localhost:5173', // Vite's default development port
    credentials: true, // If you're using cookies/sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);
// Routes
app.use (nodeRoute);
app.use (relationshipRoute);

// Health check
app.get ('/', (req, res) => {
  return res.status (200).json ({message: 'Welcome to GRAPH FUSION Test'});
});

//Listen to server
const PORT = process.env.PORT;
app.listen (PORT, () => {
  console.log (`Server running well on port http://localhost:${PORT}`);
});
