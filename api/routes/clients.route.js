import express from 'express';
import { ClientController } from '../controllers/index.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';


const router = express.Router();

//? Routes
router.post('/create', ClientController.create);
router.put('/edit/:id', AuthMiddleware.verifyToken, ClientController.edit);
router.get('/show', AuthMiddleware.verifyToken, ClientController.show);

export default router;
