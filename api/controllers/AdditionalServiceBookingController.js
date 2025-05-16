import AdditionalServicesBooking from "../models/AdditionalServicesBookingModel.js";
import { CodeStatus } from "../utils/index.js";

const AdditionalServicesBookingController = {
    create: async (req, res, next) => {
        try {
            const item = await AdditionalServicesBooking.save(req.body);
            res.status(CodeStatus.Created).json({ message: "Additional service booked", data: item });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    getByBooking: async (req, res, next) => {
        try {
            const services = await AdditionalServicesBooking.getByBookingId(req.params.bookingId);
            res.status(CodeStatus.OK).json(services);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }
};

export default AdditionalServicesBookingController;
