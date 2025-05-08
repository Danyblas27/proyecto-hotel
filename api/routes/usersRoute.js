import express from 'express';
import { UserController } from '../controllers/index.js';


const router = express.Router();

//? Routes
router.post('/create', UserController.createUser);
router.get('/getUsers', UserController.getUsers);

export default router;
