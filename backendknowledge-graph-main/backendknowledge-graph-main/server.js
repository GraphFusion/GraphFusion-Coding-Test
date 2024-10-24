const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// In-memory storage
let nodes = [];
let relationships = [];

app.use(cors());
app.use(bodyParser.json());

// Middleware for validating IDs
const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    req.validatedId = id;
    next();
};

// Get all graph data
app.get('/api/graph', (req, res) => {
    try {
        res.json({ nodes, relationships });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching graph data' });
    }
});

// Add node
app.post('/api/nodes', (req, res) => {
    try {
        const { name, type } = req.body;
        
        if (!name || !type) {
            return res.status(400).json({ error: 'Name and type are required' });
        }

        const node = {
            id: Date.now(),
            name,
            type,
            createdAt: new Date().toISOString(),
            ...req.body
        };

        nodes.push(node);
        res.status(201).json(node);
    } catch (error) {
        res.status(500).json({ error: 'Error creating node' });
    }
});

// Delete node
app.delete('/api/nodes/:id', validateId, (req, res) => {
    try {
        const nodeIndex = nodes.findIndex(node => node.id === req.validatedId);
        
        if (nodeIndex === -1) {
            return res.status(404).json({ error: 'Node not found' });
        }

        // Remove the node
        nodes.splice(nodeIndex, 1);

        // Remove related relationships
        relationships = relationships.filter(
            rel => rel.from !== req.validatedId && rel.to !== req.validatedId
        );

        res.json({ message: 'Node and related relationships deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting node' });
    }
});

// Add relationship
app.post('/api/relationships', (req, res) => {
    try {
        const { from, to, relationship } = req.body;
        
        if (!from || !to || !relationship) {
            return res.status(400).json({ error: 'From, to, and relationship are required' });
        }

        // Validate that both nodes exist
        const fromNode = nodes.find(node => node.id.toString() === from.toString());
        const toNode = nodes.find(node => node.id.toString() === to.toString());

        if (!fromNode || !toNode) {
            return res.status(400).json({ error: 'Invalid nodes selected' });
        }

        const relationshipObj = {
            id: Date.now(),
            from,
            to,
            relationship,
            fromNodeName: fromNode.name,
            toNodeName: toNode.name,
            createdAt: new Date().toISOString(),
            ...req.body
        };

        relationships.push(relationshipObj);
        res.status(201).json(relationshipObj);
    } catch (error) {
        res.status(500).json({ error: 'Error creating relationship' });
    }
});

// Delete relationship
app.delete('/api/relationships/:id', validateId, (req, res) => {
    try {
        const relIndex = relationships.findIndex(rel => rel.id === req.validatedId);
        
        if (relIndex === -1) {
            return res.status(404).json({ error: 'Relationship not found' });
        }

        relationships.splice(relIndex, 1);
        res.json({ message: 'Relationship deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting relationship' });
    }
});

// Get node by ID
app.get('/api/nodes/:id', validateId, (req, res) => {
    try {
        const node = nodes.find(node => node.id === req.validatedId);
        
        if (!node) {
            return res.status(404).json({ error: 'Node not found' });
        }

        res.json(node);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching node' });
    }
});

// Get relationships for a node
app.get('/api/nodes/:id/relationships', validateId, (req, res) => {
    try {
        const nodeRelationships = relationships.filter(
            rel => rel.from === req.validatedId || rel.to === req.validatedId
        );
        res.json(nodeRelationships);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching relationships' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});