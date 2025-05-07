import express from 'express';
import { UserController } from '../controllers/index.js';


const router = express.Router();

//? Routes
router.post('api/users/create', UserController.createUser);

export default router;
