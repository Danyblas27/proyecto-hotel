import express from "express";

import { AuthMiddleware } from "../middleware/index.js";
import BookingController from "../controllers/BookingController.js";

const router = express.Router();

router.post("/create",
    AuthMiddleware.verifyToken,
    BookingController.create
);

router.get("/show",
    AuthMiddleware.verifyToken,
    BookingController.show
);

// router.put("/edit/:id",
//     AuthMiddleware.verifyToken,
//     BookingController.update
// );
router.delete("/delete/:id",
    AuthMiddleware.verifyToken,
    BookingController.delete
);
router.patch("/edit/status/:id/:status",
    AuthMiddleware.verifyToken,
    BookingController.updateStatus
);

router.patch("/edit/updateKeyTime/:id",
    AuthMiddleware.verifyToken,
    BookingController.updateKeyTime
);

router.put("/cancel/:id",
    AuthMiddleware.verifyToken,
    BookingController.cancel
);

router.get("/availability",
    AuthMiddleware.verifyToken,
    BookingController.checkAvailability
);

// Reportes
router.get("/report/client/:client_id",
    AuthMiddleware.verifyToken,
    BookingController.reportByClient
);
router.get("/report/date-range",
    AuthMiddleware.verifyToken,
    BookingController.reportByDateRange
);
router.get("/report/status-summary",
    AuthMiddleware.verifyToken,
    BookingController.reportStatusSummary
);
router.get("/report/monthly-revenue",
    AuthMiddleware.verifyToken,
    BookingController.reportMonthlyRevenue
);

export default router;