import express from 'express';
import { getFolderById,getFolders,createFolder,updateFolder,deleteFolder } from '../handlers/folderHandler.js';

const router = express.Router();

router.get('/:id', getFolderById);
router.get('/', getFolders);
router.post('/', createFolder);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

export default router;
