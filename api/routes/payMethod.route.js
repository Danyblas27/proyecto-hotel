import express from "express";
import PayMethodController from "../controllers/PayMethodController.js";
import { AuthMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, PayMethodController.create);
router.get("/show", AuthMiddleware.verifyToken, PayMethodController.show);

export default router;