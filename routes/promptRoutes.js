import express from 'express';
import { getPromptById, getPrompts, createPrompt, updatePrompt, deletePrompt, getPromptsByMarketStatus } from '../handlers/promptHandler.js';

const router = express.Router();

router.get('/market-status', getPromptsByMarketStatus);
router.get('/:id', getPromptById);
router.get('/', getPrompts);
router.post('/', createPrompt);
router.put('/:id', updatePrompt);
router.delete('/:id', deletePrompt);

export default router;