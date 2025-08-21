import express from 'express';
import { getHistoryById,getAllHistory, createHistory, updateHistory, deleteHistory, getHistoryDetailById } from '../handlers/historyHandler.js';

const router = express.Router();

router.get('/:id/detail', getHistoryDetailById);
router.get('/:id', getHistoryById);
router.get('/', getAllHistory);
router.post('/', createHistory);
router.put('/:id', updateHistory);
router.delete('/:id', deleteHistory);

export default router;
