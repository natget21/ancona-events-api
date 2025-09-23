import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { register, login,getUserData,updateUserData,forgetPasswordRequest,forgetPasswordUpdate,resetPassword,authWithProvider } from "../handlers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sso", authWithProvider);

router.get('/me', auth.isAuthenticated, getUserData);
router.put('/update', auth.isAuthenticated, updateUserData);
router.post("/forget-password-request", forgetPasswordRequest);
router.post("/forget-password-update", forgetPasswordUpdate);
router.post("/reset-password",auth.isAuthenticated, resetPassword);


export default router;