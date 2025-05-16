import express from 'express';
import { ClientController } from '../controllers/index.js';


const router = express.Router();

//? Routes
router.post('api/clients/create', ClientController.createClient);

export default router;
