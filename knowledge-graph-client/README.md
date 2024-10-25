# Knowledge Graph Client

## Project Overview

This frontend is a dynamic and interactive interface for the Knowledge Graph Application, enabling users to visualize, add, and view nodes and relationships.

## Tech Stack

- React - UI library for creating interactive components
- TypeScript - Strongly typed JavaScript for improved code reliability
- D3.js - Data-driven graph visualization
- Vite - Fast and optimized development server and build tool
- Zustand - State management library for managing app state

## Project Structure

```
knowledge-graph-client/
├── src/
│   ├── api/                 # API calls and services
│   ├── components/          # Reusable UI components (e.g., GraphVisualization, NodeModal)
│   ├── hook/                # Custom hooks for handling logic
│   ├── store/               # Zustand state management files
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point of the application
│   └── index.css            # Global CSS styles
├── public/                  # Static assets
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

## Getting Started

### Prerequisites

Ensure you have Node.js (v20+) and npm or yarn installed.

### installation

1. Clone the repository:

```
git clone git@github.com:rOluochKe/GraphFusion-Coding-Test.git
cd GraphFusion-Coding-Test/knowledge-graph-client
```

2. Install dependencies:

```
npm install
```

3. Running the App:

```
npm run dev
```

The frontend should now be accessible at `http://localhost:5173`
