import express from "express";
import { RoomController } from "../controllers/index.js";
import { AuthMiddleware } from "../middleware/index.js";


const router = express.Router();

router.post("/create", 
    AuthMiddleware.verifyToken, 
    AuthMiddleware.requireSelfOrAdmin, 
    RoomController.create
);
router.get("/show", 
    AuthMiddleware.verifyToken, 
    RoomController.show
);
router.put("/edit/:id", 
    AuthMiddleware.verifyToken, 
    AuthMiddleware.requireSelfOrAdmin, 
    RoomController.edit
);
router.delete("/trash/:id", 
    AuthMiddleware.verifyToken, 
    AuthMiddleware.requireSelfOrAdmin, 
    RoomController.trash
);
router.patch("/setAvailAvailability/:id/:available", 
    AuthMiddleware.verifyToken, 
    AuthMiddleware.requireSelfOrAdmin, 
    RoomController.toggleAvailability
);

export default router;
