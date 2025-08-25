import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getSocialById,getAllSocials,createSocial,updateSocial,deleteSocial } from '../handlers/socialController.js';

const router = express.Router();

router.get('/:id', getSocialById);
router.get('/', getAllSocials);
router.post('/', createSocial);
router.put('/:id', updateSocial);
router.delete('/:id', deleteSocial);

export default router;