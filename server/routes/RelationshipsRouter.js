import express from 'express';
import {
  createRelationship,
  getRelationshipById,
  viewAllRelationships,
} from '../controller/Relationships.js';

const relationshipRoute = express.Router ();

relationshipRoute.get ('/relationship', viewAllRelationships);
relationshipRoute.get ('/relationship/:id', getRelationshipById);
relationshipRoute.post ('/relationship', createRelationship);

export default relationshipRoute;
