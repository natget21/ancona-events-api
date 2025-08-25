import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getAccommodationById,getAllAccommodations,createAccommodation,updateAccommodation,deleteAccommodation } from '../handlers/accommodationController.js';

const router = express.Router();

router.get('/:id', getAccommodationById);
router.get('/', getAllAccommodations);
router.post('/', createAccommodation);
router.put('/:id', updateAccommodation);
router.delete('/:id', deleteAccommodation);

export default router;