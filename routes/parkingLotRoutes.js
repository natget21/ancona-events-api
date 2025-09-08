import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getParkingLotById,getAllParkingLots,createParkingLot,updateParkingLot,deleteParkingLot,findParkingLots } from '../handlers/parkingLotController.js';

const router = express.Router();

// custom routes
router.get('/find', findParkingLots);

router.get('/:id', getParkingLotById);
router.get('/', getAllParkingLots);
router.post('/', createParkingLot);
router.put('/:id', updateParkingLot);
router.delete('/:id', deleteParkingLot);

export default router;