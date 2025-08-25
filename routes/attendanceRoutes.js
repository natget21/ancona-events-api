import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getAttendanceById,getAllAttendances,createAttendance,updateAttendance,deleteAttendance } from '../handlers/attendanceController.js';

const router = express.Router();

router.get('/:id', getAttendanceById);
router.get('/', getAllAttendances);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;