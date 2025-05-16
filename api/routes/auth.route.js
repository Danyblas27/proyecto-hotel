import express from 'express';
import { AuthController, UserController } from '../controllers/index.js';

import AuthMiddleware from '../middleware/AuthMiddleware.js';


const router = express.Router();

//? Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/profile', AuthMiddleware.verifyToken, AuthController.profile);

export default router;
