import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getTripById, getAllTrips, createTrip, updateTrip, deleteTrip, findTrips, findTripById } from '../handlers/tripController.js';

const router = express.Router();

router.get('/find', findTrips);
router.get('/findById', findTripById);

router.get('/:id', getTripById);
router.get('/', getAllTrips);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

export default router;