import express from 'express';
import multer from 'multer';
import { uploadResources, getResourcesDataByUserId, getResourceDataById, deleteResource, updateResourceMetaData,downloadResource, getResources } from '../handlers/resourceController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload',upload.single('file'), uploadResources);
router.get('/get-resources-by-user-id/:userId', getResourcesDataByUserId);
router.get('/download/:id', downloadResource);
router.get('/:id', getResourceDataById);
router.get('/', getResources);
router.put('/:id', updateResourceMetaData);
router.delete('/:id', deleteResource);



export default router;