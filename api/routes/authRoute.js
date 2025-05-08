import express from 'express';
import { AuthController, UserController } from '../controllers/index.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

//? Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/profile', verifyToken, AuthController.profile);

export default router;
