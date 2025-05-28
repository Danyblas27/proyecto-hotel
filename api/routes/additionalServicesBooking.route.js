import express from "express";

import { AuthMiddleware } from "../middleware/index.js";
import AdditionalServicesBookingController from "../controllers/AdditionalServiceBookingController.js";

const router = express.Router();

router.put("/add/:bookingId/:additionalServiceId", 
    AuthMiddleware.verifyToken, 
    AdditionalServicesBookingController.add
);
router.get("/show", 
    AuthMiddleware.verifyToken, 
    AdditionalServicesBookingController.show
);
router.delete("/remove/:bookingId/:additionalServiceId", 
    AuthMiddleware.verifyToken, 
    AdditionalServicesBookingController.remove
);

export default router;