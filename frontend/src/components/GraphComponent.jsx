import { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";

const GraphComponent = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4500/relationship");
        const relationships = response.data;

        // Set to store unique nodes
        const uniqueNodes = new Set();
        const nodes = [];
        const edges = [];

        // Process relationships into nodes and edges
        relationships.forEach((relationship) => {
          const fromNode = {
            id: relationship.from._id,
            data: { label: relationship.from.name },
            position: { x: Math.random() * 300, y: Math.random() * 100 }, // Adjusted for visibility
          };

          const toNode = {
            id: relationship.to._id,
            data: { label: relationship.to.name },
            position: { x: Math.random() * 300 + 300, y: Math.random() * 100 }, // Adjusted for visibility
          };

          // Add unique nodes only
          if (!uniqueNodes.has(fromNode.id)) {
            uniqueNodes.add(fromNode.id);
            nodes.push(fromNode);
          }
          if (!uniqueNodes.has(toNode.id)) {
            uniqueNodes.add(toNode.id);
            nodes.push(toNode);
          }

          // Add the relationship as an edge
          edges.push({
            id: `edge-${relationship._id}`,
            source: fromNode.id,
            target: toNode.id,
            label: relationship.relationship,
            animated: true,
            style: { stroke: "#000" },
          });
        });

        console.log("Elements:", [...nodes, ...edges]);

        // Combine nodes and edges into a single elements array
        setElements([...nodes, ...edges]);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-96 w-full z-[1000]">
      {" "}
      {/* Relative positioning with z-index */}
      <ReactFlow elements={elements} className="react-flow flex gap-x-2">
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default GraphComponent;
