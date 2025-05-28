import express from "express";
import AdditionalServiceController from "../controllers/AdditionalServiceController.js";
import { AuthMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/create", 
    AuthMiddleware.verifyToken, 
    AdditionalServiceController.create
);
router.get("/show", 
    //AuthMiddleware.verifyToken, 
    AdditionalServiceController.show
);
router.put("/edit/:id", 
    AuthMiddleware.verifyToken, 
    AuthMiddleware.requireSelfOrAdmin,
    AdditionalServiceController.edit
);

export default router;
