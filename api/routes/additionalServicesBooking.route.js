import express from "express";

import { AuthMiddleware } from "../middleware/index.js";
import AdditionalServicesBookingController from "../controllers/AdditionalServiceBookingController.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, AdditionalServicesBookingController.create);
router.get("/booking/:bookingId", AuthMiddleware.verifyToken, AdditionalServicesBookingController.getByBooking);

export default router;