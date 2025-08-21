import express from 'express';
import { getPromptCategoryById,getPromptCategories, createPromptCategory, updatePromptCategory, deletePromptCategory } from '../handlers/promptCategoryHandler.js';

const router = express.Router();

router.get('/:id', getPromptCategoryById);
router.get('/', getPromptCategories);
router.post('/', createPromptCategory);
router.put('/:id', updatePromptCategory);
router.delete('/:id', deletePromptCategory);

export default router;
