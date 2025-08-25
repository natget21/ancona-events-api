import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getNotificationById,getNotificationByUserId,getAllNotifications,createNotification,updateNotification,deleteNotification, markAllAsRead, markAsRead } from '../handlers/notificationController.js';

const router = express.Router();

//custom routes
router.post('/mark-as-read/:id',markAsRead);
router.post('/mark-all-as-read/:userId',markAllAsRead);

// standard routes
router.get('/user/:userId', getNotificationByUserId);
router.get('/:id', getNotificationById);
router.get('/', getAllNotifications);
router.post('/', createNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;