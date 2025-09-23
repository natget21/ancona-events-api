import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getUserById,getUsersByRole,getAllUsers,createUser,updateUser,deleteUser,assignAccommodationToUser,updateDeviceToken,updateUserMetaData } from '../handlers/userController.js';

const router = express.Router();


router.post('/assignAccommodation', assignAccommodationToUser);
router.put('/updateDeviceToken',auth.isAuthenticated, updateDeviceToken);
router.put('/updateUserMetaData',auth.isAuthenticated, updateUserMetaData);

router.get('/role/:role', getUsersByRole);
router.get('/:id', getUserById);
router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;