import express from "express";
import AdditionalServicesBookingController from "../controllers/AdditionalServicesBookingController.js";
import { AuthMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, AdditionalServicesBookingController.create);
router.get("/booking/:bookingId", AuthMiddleware.verifyToken, AdditionalServicesBookingController.getByBooking);

export default router;