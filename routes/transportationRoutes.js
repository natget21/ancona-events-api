import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getTransportationById,getAllTransportation,createTransportation,updateTransportation,deleteTransportation } from '../handlers/transportationController.js';

const router = express.Router();

router.get('/:id', getTransportationById);
router.get('/', getAllTransportation);
router.post('/', createTransportation);
router.put('/:id', updateTransportation);
router.delete('/:id', deleteTransportation);

export default router;