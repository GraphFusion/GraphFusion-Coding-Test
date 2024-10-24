import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', 
});

export const addNode = (nodeData) => API.post('/nodes', nodeData);
export const addRelationship = (relationshipData) => API.post('/relationships', relationshipData);
export const fetchGraphData = () => API.get('/graph');
