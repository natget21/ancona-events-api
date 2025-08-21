import express from 'express';
import { sendRequest,sendPromptRequest } from '../handlers/aiRequestHandler.js';

const router = express.Router();

router.post('/sendRequest', sendRequest);
router.post('/sendPromptRequest', sendPromptRequest);

export default router;
