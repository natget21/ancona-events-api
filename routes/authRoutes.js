import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { register, login,getUserData,updateUserData,forgetPasswordRequest,forgetPasswordUpdate,resetPassword,signinWithProvider,registerWithProvider } from "../handlers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get('/me', auth.isAuthenticated, getUserData);
router.put('/update', auth.isAuthenticated, updateUserData);
router.post("/forget-password-request", forgetPasswordRequest);
router.post("/forget-password-update", forgetPasswordUpdate);
router.post("/reset-password",auth.isAuthenticated, resetPassword);

router.post("/sso/signin/:provider",auth.isAuthenticated, signinWithProvider);
router.post("/sso/register/:provider",auth.isAuthenticated, registerWithProvider);


export default router;