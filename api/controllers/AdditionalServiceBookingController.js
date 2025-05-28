
;

import AdditionalServiceBooking from "../models/AdditionalServiceBooking.js";
import { CodeStatus } from "../utils/index.js";


const AdditionalServicesBookingController = {

    add: async (req, res, next) => {
        try {
            const { bookingId, additionalServiceId } = req.params;
            if (!bookingId || !additionalServiceId) {
                return res.status(CodeStatus.BadRequest).json({ message: "Booking ID and Additional Service ID are required" });
            }
            const item = await AdditionalServiceBooking.save(bookingId, additionalServiceId);
            res.status(CodeStatus.Created).json({ 
                code: CodeStatus.Created,
                message: "Additional service booked", 
                data: item 
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            const { bookingId, additionalServiceId } = req.params;
            if (!bookingId || !additionalServiceId) {
                return res.status(CodeStatus.BadRequest).json({ message: "Booking ID and Additional Service ID are required" });
            }
            const item = await AdditionalServiceBooking.delete(
                bookingId, additionalServiceId
            );
            if (!item) {
                return res.status(CodeStatus.NotFound).json({
                    code: CodeStatus.NotFound,
                    message: "Additional service booking not found", 
                    data: null
                });
            }
            res.status(CodeStatus.OK).json({
                code: CodeStatus.OK,
                message: "Additional service booking removed", 
                data: item 
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            console.log(req);
            const { id } = req.query;
            if (!id) {
                return res.status(CodeStatus.BadRequest).json({
                    code: CodeStatus.BadRequest,
                    message: "Booking ID is required",
                    data: null
                });
            }
            const services = await AdditionalServiceBooking.getByBookingId(id);
            res.status(CodeStatus.OK).json({
                code: CodeStatus.OK,
                message: "Additional services for booking retrieved successfully",
                data: services
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }
};

export default AdditionalServicesBookingController;
