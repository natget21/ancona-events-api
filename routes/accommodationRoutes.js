import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getAccommodationById,getAllAccommodations,createAccommodation,updateAccommodation,deleteAccommodation,findMyAccommodation } from '../handlers/accommodationController.js';

const router = express.Router();


router.get('/findMyAccommodation',auth.isAuthenticated, findMyAccommodation);

router.get('/:id', getAccommodationById);
router.get('/', getAllAccommodations);
router.post('/', createAccommodation);
router.put('/:id', updateAccommodation);
router.delete('/:id', deleteAccommodation);

export default router;