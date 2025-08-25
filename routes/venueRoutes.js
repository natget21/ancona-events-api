import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getVenueById,getAllVenues,createVenue,updateVenue,deleteVenue } from '../handlers/venueController.js';

const router = express.Router();

router.get('/:id', getVenueById);
router.get('/', getAllVenues);
router.post('/', createVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

export default router;