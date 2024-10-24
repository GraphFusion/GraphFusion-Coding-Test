import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const GraphVisualization = ({ nodes, relationships }) => {
  const cyRef = useRef(null);

  useEffect(() => {
    cyRef.current = cytoscape({
      container: document.getElementById('cy'),
      elements: [],
      style: [ 
        {
          selector: 'node',
          style: {
            'background-color': '#0074D9',
            'label': 'data(label)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#000000',
            'target-arrow-color': '#AAAAAA',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)'
          }
        }
      ],
      layout: {
        name: 'grid',
        rows: 1
      }
    });

    return () => {
      cyRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.elements().remove(); // Remove existing elements

      // Add nodes to the graph
      const cyNodes = nodes.map((node) => ({
        data: { id: node._id, label: node.name }
      }));

      // Add relationships (edges) to the graph
      const cyEdges = relationships.map((rel) => ({
        data: { 
          id: rel._id, 
          source: rel.from._id, 
          target: rel.to._id, 
          label: rel.type 
        }
      }));

      cyRef.current.add([...cyNodes, ...cyEdges]); 

 
      cyRef.current.layout({ 
        name: 'breadthfirst', 
        directed: true , 
        direction:'vertical',
        padding: 20,
        animate: true
      }).run();
    }
  }, [nodes, relationships]); 

  return (
    <div id="cy" style={{ width: '100%', height: '500px', border: '1px solid black' }}></div>
  );
};

export default GraphVisualization;
