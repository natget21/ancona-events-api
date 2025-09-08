import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getEventById,getAllEvents,createEvent,updateEvent,deleteEvent,findEvents } from '../handlers/eventController.js';

const router = express.Router();

// custom routes
router.get('/find', findEvents);

router.get('/:id', getEventById);
router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;