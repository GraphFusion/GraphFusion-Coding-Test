import { Router } from 'express';
import { addNode, addRelationship, getGraphData } from '../controllers/graphController';

const router = Router();

router.post('/nodes', addNode);
router.post('/relationships', addRelationship);
router.get('/graph', getGraphData);

export default router;
