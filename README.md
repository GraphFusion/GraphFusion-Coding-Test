# GraphFusion Full-Stack Developer Coding Test

## Objective
The goal of this test is to assess your ability to develop a minimal dynamic knowledge graph application where users can input nodes and relationships, and visualize the graph in real-time.

## Requirements
- **Backend**: Use either Node.js (Express) or Python (Flask/Django).
- **Frontend**: Use React (or any JavaScript framework).
- **Graph Visualization**: Use a graph visualization library like D3.js or Cytoscape.js.
- **Database**: Optional - You can use an in-memory data structure (like arrays) or a simple database (SQLite, MongoDB).

### Functional Requirements:
1. **Add Nodes**: Users should be able to create nodes (e.g., entities).
2. **Add Relationships**: Users should be able to create relationships between nodes.
3. **Display Graph**: The application should display a dynamic graph visualization of nodes and relationships.
4. **Retrieve Graph Data**: The app should have an API to retrieve all nodes and relationships.

## Task Breakdown
1. **Backend Setup**
   - Create an API using either Node.js (Express) or Python (Flask/Django).
   - The API should allow adding nodes and relationships, and fetching the graph data.

2. **Frontend Setup**
   - Develop a user interface using React (or a framework of your choice).
   - Users should be able to add nodes and relationships through the UI.

3. **Graph Visualization**
   - Integrate a graph visualization library (D3.js, Cytoscape.js, or similar).
   - The graph should dynamically update as nodes and relationships are added.

4. **Bonus**: If you're comfortable, feel free to use a database to persist data between sessions.

## How to Complete the Test
1. **Fork this Repository**: Fork this repository to your GitHub account.
2. **Work on a New Branch**: Create a new branch for your implementation (e.g., `yourname-feature`).
3. **Implement the Features**: Complete the tasks as outlined above.
4. **Submit a Pull Request**: When you’re done, submit a pull request back to this repository.

## Evaluation Criteria
Your submission will be evaluated based on:
- **Functionality**: Does your application work as expected?
- **Code Quality**: Is your code clean, modular, and maintainable?
- **Adherence to Requirements**: Have you met all the functional requirements?
- **User Experience**: Is the UI intuitive and easy to use?
- **Bonus Points**: For adding extra features like persistent storage or optimizing the graph visualization.

## Sample Data (Optional)
Here’s an example of how you might structure node and relationship data:

### Example Nodes:
- Node 1: `{"id": 1, "name": "GraphFusion", "type": "company"}`
- Node 2: `{"id": 2, "name": "Kiplangat Korir", "type": "person"}`

### Example Relationship:
- `{"from": 1, "to": 2, "relationship": "founder"}`

You can format the data however you prefer in your implementation.

## Submission Deadline
Please submit your pull request by **November 1 2024**.

Good luck! If you have any questions, feel free to reach out.
