from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for nodes and relationships
nodes = []
relationships = []

# Route to add nodes
@app.route('/add-node', methods=['POST'])
def add_node():
    node = request.json
    nodes.append(node)
    return jsonify(node), 201

# Route to add relationships
@app.route('/add-relationship', methods=['POST'])
def add_relationship():
    relationship = request.json
    relationships.append(relationship)
    return jsonify(relationship), 201

# Route to fetch the graph data
@app.route('/graph', methods=['GET'])
def get_graph():
    return jsonify({'nodes': nodes, 'relationships': relationships})

if __name__ == '__main__':
    app.run(debug=True)