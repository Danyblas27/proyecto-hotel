import express from "express";
import BookingController from "../controllers/BookingController.js";
import { AuthMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/create", AuthMiddleware.verifyToken, BookingController.create);
router.get("/show", AuthMiddleware.verifyToken, BookingController.getAll);
router.get("/show/:id", AuthMiddleware.verifyToken, BookingController.getById);
router.put("/edit/:id", AuthMiddleware.verifyToken, BookingController.update);
router.delete("/delete/:id", AuthMiddleware.verifyToken, BookingController.delete);

// Reportes
router.get("/report/client/:client_id", AuthMiddleware.verifyToken, BookingController.reportByClient);
router.get("/report/date-range", AuthMiddleware.verifyToken, BookingController.reportByDateRange);
router.get("/report/status-summary", AuthMiddleware.verifyToken, BookingController.reportStatusSummary);
router.get("/report/monthly-revenue", AuthMiddleware.verifyToken, BookingController.reportMonthlyRevenue);

export default router;