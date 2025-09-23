import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getWeatherData } from '../handlers/externalServiceController.js';

const router = express.Router();

router.get('/weather', getWeatherData);

export default router;