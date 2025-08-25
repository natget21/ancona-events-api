import express from 'express';
import {tokenAuth,scopeAuth} from '../middleware/auth0.js';
import { registerUser,  getUserWithMetaData, updateUserData,hostedLogin,getToken,logout, updateUserMetadata } from '../handlers/auth0Handler.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/me', tokenAuth, getUserWithMetaData);
router.put('/update-user-data', tokenAuth,  updateUserData);
router.put('/update-user-metadata', tokenAuth, updateUserMetadata);


// backend login
router.get('/hosted-login', hostedLogin);
router.post('/get-token', getToken);
router.get('/logout', logout);

export default router;

