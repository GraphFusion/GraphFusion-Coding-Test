import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { Box, Button, Tooltip } from '@chakra-ui/react';

cytoscape.use(cola);

const GraphVisualization = ({ 
    nodes, 
    relationships, 
    onNodeClick,
    onNodeDelete,
    onRelationshipDelete 
}) => {
    const containerRef = useRef(null);
    const cyRef = useRef(null);

    useEffect(() => {
        cyRef.current = cytoscape({
            container: containerRef.current,
            elements: {
                nodes: nodes.map(node => ({
                    data: { 
                        id: node.id.toString(), 
                        label: node.name, 
                        type: node.type 
                    }
                })),
                edges: relationships.map(rel => ({
                    data: {
                        id: rel.id.toString(),
                        source: rel.from.toString(),
                        target: rel.to.toString(),
                        label: rel.relationship
                    }
                }))
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(label)',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'text-wrap': 'wrap',
                        'text-max-width': '100px',
                        'font-size': '12px',
                        'width': '40px',
                        'height': '40px'
                    }
                },
                {
                    selector: 'node[type = "person"]',
                    style: {
                        'background-color': '#4299E1'
                    }
                },
                {
                    selector: 'node[type = "company"]',
                    style: {
                        'background-color': '#48BB78'
                    }
                },
                {
                    selector: 'node[type = "project"]',
                    style: {
                        'background-color': '#ED8936'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#CBD5E0',
                        'target-arrow-color': '#CBD5E0',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '10px',
                        'text-rotation': 'autorotate',
                        'text-margin-y': -10
                    }
                },
                {
                    selector: ':selected',
                    style: {
                        'border-width': 2,
                        'border-color': '#3182CE'
                    }
                }
            ],
            layout: {
                name: 'cola',
                nodeSpacing: 120,
                edgeLengthVal: 150,
                animate: true,
                randomize: false,
                maxSimulationTime: 1500
            }
        });

        // Event handlers
        cyRef.current.on('tap', 'node', (evt) => {
            const node = evt.target;
            onNodeClick(parseInt(node.id()));
        });

        cyRef.current.on('taphold', 'node', (evt) => {
            const node = evt.target;
            if (window.confirm('Delete this node and its relationships?')) {
                onNodeDelete(parseInt(node.id()));
            }
        });

        cyRef.current.on('taphold', 'edge', (evt) => {
            const edge = evt.target;
            if (window.confirm('Delete this relationship?')) {
                onRelationshipDelete(parseInt(edge.id()));
            }
        });

        return () => {
            if (cyRef.current) {
                cyRef.current.destroy();
            }
        };
    }, [nodes, relationships, onNodeClick, onNodeDelete, onRelationshipDelete]);

    return (
        <Box position="relative">
            <Box position="absolute" top={2} right={2} zIndex={1}>
                <Tooltip label="Click a node to view details. Hold click to delete.">
                    <Button size="sm" variant="ghost">
                        Help
                    </Button>
                </Tooltip>
            </Box>
            <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
        </Box>
    );
};

export default GraphVisualization;