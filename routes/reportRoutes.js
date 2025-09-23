import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getReportById,getAllReports,createReport,updateReport,deleteReport } from '../handlers/reportController.js';

const router = express.Router();

router.get('/:id', getReportById);
router.get('/', getAllReports);
router.post('/', createReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

export default router;