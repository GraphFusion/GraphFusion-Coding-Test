import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const RelationshipForm = ({ nodes, onAddRelationship }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [relationship, setRelationship] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRelationship({ from, to, relationship });
        setRelationship('');
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4}>
            <FormControl>
                <FormLabel>From Node</FormLabel>
                <Select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                >
                    <option value="">Select node</option>
                    {nodes.map(node => (
                        <option key={node.id} value={node.id}>
                            {node.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>To Node</FormLabel>
                <Select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                >
                    <option value="">Select node</option>
                    {nodes.map(node => (
                        <option key={node.id} value={node.id}>
                            {node.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Relationship</FormLabel>
                <Input
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Enter relationship type"
                    required
                />
            </FormControl>
            <Button mt={4} colorScheme="green" type="submit">
                Add Relationship
            </Button>
        </Box>
    );
};

export default RelationshipForm;