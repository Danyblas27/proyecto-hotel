import express from 'express';
import { UserController } from '../controllers/index.js';
import { AuthMiddleware } from '../middleware/index.js';


const router = express.Router();

//? Routes
router.post('/create',
    AuthMiddleware.verifyToken,
    AuthMiddleware.requireSelfOrAdmin,
    UserController.create
);
router.put('/edit/:id',
    AuthMiddleware.verifyToken,
    AuthMiddleware.requireSelfOrAdmin,
    UserController.edit
);
router.delete('/trash/:id',
    AuthMiddleware.verifyToken,
    AuthMiddleware.requireSelfOrAdmin,
    UserController.trash
);
router.get('/show', 
    AuthMiddleware.verifyToken, 
    UserController.show
);

export default router;
