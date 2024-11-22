import express from 'express';
import {createNode, getNodeById, viewAllNodes} from '../controller/nodes.js';

const nodeRoute = express.Router ();

nodeRoute.get ('/nodes', viewAllNodes);
nodeRoute.post ('/nodes', createNode);
nodeRoute.get ('/nodes', getNodeById);

export default nodeRoute;
