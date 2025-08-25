import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getProgramById,getAllPrograms,createProgram,updateProgram,deleteProgram } from '../handlers/programController.js';

const router = express.Router();

router.get('/:id', getProgramById);
router.get('/', getAllPrograms);
router.post('/', createProgram);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

export default router;