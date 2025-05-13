import express from "express";
import { RoomController } from "../controllers/index.js";
import { AuthMiddleware } from "../middleware/index.js";


const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, AuthMiddleware.requireSelfOrAdmin, RoomController.create);
router.get("/show", AuthMiddleware.verifyToken, AuthMiddleware.requireSelfOrAdmin, RoomController.create);
router.get("/show/:id", AuthMiddleware.verifyToken, AuthMiddleware.requireSelfOrAdmin, RoomController.create);
router.put("/edit/:id", AuthMiddleware.verifyToken, AuthMiddleware.requireSelfOrAdmin, RoomController.create);
router.delete("/delete/:id", AuthMiddleware.verifyToken, AuthMiddleware.requireSelfOrAdmin, RoomController.create);
router.patch("/setAvailAvailability/:id/availability", AuthMiddleware.verifyToken, AuthMiddleware.requireSelfOrAdmin, RoomController.create);

export default router;
