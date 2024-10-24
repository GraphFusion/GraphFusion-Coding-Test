import React, { useState, useEffect, useCallback } from 'react';
import { 
    ChakraProvider, 
    Box, 
    Container, 
    Heading, 
    SimpleGrid,
    useToast,
    Text
} from '@chakra-ui/react';
import axios from 'axios';
import GraphVisualization from './components/GraphVisualization';
import NodeForm from './components/NodeForm';
import RelationshipForm from './components/RelationshipForm';

const API_URL = 'http://localhost:5000/api';

function App() {
    const [nodes, setNodes] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const toast = useToast();

    const fetchGraphData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/graph`);
            setNodes(response.data.nodes);
            setRelationships(response.data.relationships);
        } catch (error) {
            showToast('Error fetching graph data', 'error');
        }
    }, []);

    useEffect(() => {
        fetchGraphData();
    }, [fetchGraphData]);

    const showToast = (message, status = 'info') => {
        toast({
            title: status === 'error' ? 'Error' : 'Success',
            description: message,
            status: status,
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        });
    };

    const handleAddNode = async (nodeData) => {
        try {
            // Check for duplicate node names
            if (nodes.some(node => node.name.toLowerCase() === nodeData.name.toLowerCase())) {
                showToast('A node with this name already exists', 'error');
                return;
            }

            const response = await axios.post(`${API_URL}/nodes`, nodeData);
            setNodes([...nodes, response.data]);
            showToast('Node added successfully', 'success');
        } catch (error) {
            showToast(error.response?.data?.error || 'Error adding node', 'error');
        }
    };

    const handleAddRelationship = async (relationshipData) => {
        try {
            // Check for self-relationships
            if (relationshipData.from === relationshipData.to) {
                showToast('Cannot create relationship to the same node', 'error');
                return;
            }

            // Check for duplicate relationships
            const isDuplicate = relationships.some(rel => 
                rel.from === relationshipData.from && 
                rel.to === relationshipData.to && 
                rel.relationship.toLowerCase() === relationshipData.relationship.toLowerCase()
            );

            if (isDuplicate) {
                showToast('This relationship already exists', 'error');
                return;
            }

            const response = await axios.post(`${API_URL}/relationships`, relationshipData);
            setRelationships([...relationships, response.data]);
            showToast('Relationship added successfully', 'success');
        } catch (error) {
            showToast(error.response?.data?.error || 'Error adding relationship', 'error');
        }
    };

    const handleNodeClick = async (nodeId) => {
        try {
            const response = await axios.get(`${API_URL}/nodes/${nodeId}/relationships`);
            setSelectedNode({
                node: nodes.find(n => n.id === nodeId),
                relationships: response.data
            });
        } catch (error) {
            showToast('Error fetching node details', 'error');
        }
    };

    const handleDeleteNode = async (nodeId) => {
        try {
            await axios.delete(`${API_URL}/nodes/${nodeId}`);
            setNodes(nodes.filter(node => node.id !== nodeId));
            setRelationships(relationships.filter(
                rel => rel.from !== nodeId && rel.to !== nodeId
            ));
            setSelectedNode(null);
            showToast('Node deleted successfully', 'success');
        } catch (error) {
            showToast('Error deleting node', 'error');
        }
    };

    const handleDeleteRelationship = async (relationshipId) => {
        try {
            await axios.delete(`${API_URL}/relationships/${relationshipId}`);
            setRelationships(relationships.filter(rel => rel.id !== relationshipId));
            showToast('Relationship deleted successfully', 'success');
        } catch (error) {
            showToast('Error deleting relationship', 'error');
        }
    };

    return (
        <ChakraProvider>
            <Container maxW="container.xl" py={8}>
                <Heading mb={8}>Knowledge Graph Visualization</Heading>
                <SimpleGrid columns={2} spacing={8} mb={8}>
                    <Box>
                        <Heading size="md" mb={4}>Add Node</Heading>
                        <NodeForm onAddNode={handleAddNode} />
                    </Box>
                    <Box>
                        <Heading size="md" mb={4}>Add Relationship</Heading>
                        <RelationshipForm
                            nodes={nodes}
                            onAddRelationship={handleAddRelationship}
                        />
                    </Box>
                </SimpleGrid>
                
                {selectedNode && (
                    <Box mb={8} p={4} borderWidth={1} borderRadius="lg">
                        <Heading size="sm" mb={2}>Selected Node: {selectedNode.node.name}</Heading>
                        <Text mb={2}>Type: {selectedNode.node.type}</Text>
                        <Text mb={2}>Relationships:</Text>
                        {selectedNode.relationships.map(rel => (
                            <Box key={rel.id} p={2} bg="gray.50" mb={2} borderRadius="md">
                                <Text>
                                    {rel.fromNodeName} → {rel.relationship} → {rel.toNodeName}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                )}

                <Box borderWidth={1} borderRadius="lg" overflow="hidden">
                    <GraphVisualization 
                        nodes={nodes} 
                        relationships={relationships}
                        onNodeClick={handleNodeClick}
                        onNodeDelete={handleDeleteNode}
                        onRelationshipDelete={handleDeleteRelationship}
                    />
                </Box>
            </Container>
        </ChakraProvider>
    );
}

export default App;