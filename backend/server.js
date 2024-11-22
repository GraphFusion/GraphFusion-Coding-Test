// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./knowledge_graph.db');

app.use(cors());
app.use(express.json());

// Initialize database tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS nodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS relationships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        from_node INTEGER NOT NULL,
        to_node INTEGER NOT NULL,
        relationship TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (from_node) REFERENCES nodes(id),
        FOREIGN KEY (to_node) REFERENCES nodes(id)
    )`);
});

// API Routes
app.get('/api/fetch_nodes', (req, res) => {
    db.all('SELECT * FROM nodes', (err, nodes) => {
        if (err) reject(err);
        res.send(nodes);
    });
});

app.post('/api/nodes', (req, res) => {
    const { name, type } = req.body;
    db.run('INSERT INTO nodes (name, type) VALUES (?, ?)', [name, type], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, type });
    });
});

app.post('/api/relationships', (req, res) => {
    const { from_node, to_node, relationship } = req.body;
    db.run(
        'INSERT INTO relationships (from_node, to_node, relationship) VALUES (?, ?, ?)',
        [from_node, to_node, relationship],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, from_node, to_node, relationship });
        }
    );
});

app.get('/api/graph', (req, res) => {
    Promise.all([
        new Promise((resolve, reject) => {
            db.all('SELECT * FROM nodes', (err, nodes) => {
                if (err) reject(err);
                resolve(nodes);
            });
        }),
        new Promise((resolve, reject) => {
            db.all('SELECT * FROM relationships', (err, relationships) => {
                if (err) reject(err);
                resolve(relationships);
            });
        })
    ])
    .then(([nodes, relationships]) => {
        res.json({ nodes, relationships });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});