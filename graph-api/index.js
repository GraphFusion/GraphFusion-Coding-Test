const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/graphDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define Schemas
const nodeSchema = new mongoose.Schema({
  name: String,
  properties: mongoose.Schema.Types.Mixed, // Store node-specific properties
});

const relationshipSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
  type: String,
});

const Node = mongoose.model('Node', nodeSchema);
const Relationship = mongoose.model('Relationship', relationshipSchema);



// Create a new node
app.post('/nodes', async (req, res) => {
  const { name, properties } = req.body;
  const newNode = new Node({ name, properties });
  await newNode.save();
  res.status(201).send(newNode);
});

// Add relationship from one node to the other
app.post('/relationships', async (req, res) => {
  const { from, to, type } = req.body;
  const newRelationship = new Relationship({ from, to, type });
  await newRelationship.save();
  res.status(201).send(newRelationship);
});

// Get graph data (nodes + relationships)
app.get('/graph', async (req, res) => {
  const nodes = await Node.find();
  const relationships = await Relationship.find().populate('from to');
  res.status(200).json({ nodes, relationships });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
