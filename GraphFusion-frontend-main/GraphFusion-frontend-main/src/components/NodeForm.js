import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const NodeForm = ({ onAddNode }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('person');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddNode({ name, type });
        setName('');
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4}>
            <FormControl>
                <FormLabel>Node Name</FormLabel>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter node name"
                    required
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Node Type</FormLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="person">Person</option>
                    <option value="company">Company</option>
                    <option value="project">Project</option>
                </Select>
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">
                Add Node
            </Button>
        </Box>
    );
};

export default NodeForm;