import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getEventById,getAllEvents,createEvent,updateEvent,deleteEvent } from '../handlers/eventController.js';

const router = express.Router();

router.get('/:id', getEventById);
router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;