import express from 'express';
import { UserController } from '../controllers/index.js';


const router = express.Router();

//? Routes
router.post('/create', UserController.createUser);

export default router;
