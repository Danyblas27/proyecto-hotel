import AdditionalService from "../models/AdditionalServiceModel.js";
import { CodeStatus } from "../utils/index.js";

const AdditionalServiceController = {
    create: async (req, res, next) => {
        try {
            const service = await AdditionalService.save(req.body);
            res.status(CodeStatus.Created).json({ message: "Service created", data: service });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    show: async (req, res, next) => {
        try {
            const services = await AdditionalService.getAll();
            res.status(CodeStatus.OK).json(services);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }
};

export default AdditionalServiceController;