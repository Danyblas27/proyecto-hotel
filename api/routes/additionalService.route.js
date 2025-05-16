import express from "express";
import AdditionalServiceController from "../controllers/AdditionalServiceController.js";
import { AuthMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, AdditionalServiceController.create);
router.get("/show", AuthMiddleware.verifyToken, AdditionalServiceController.show);

export default router;
