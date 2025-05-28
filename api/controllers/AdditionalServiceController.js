

import { responses } from "../middleware/index.js";
import AdditionalService from "../models/AdditionalService.js";
import { CodeStatus } from "../utils/index.js";

const AdditionalServiceController = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            const service = await AdditionalService.save(data);
            return responses.successResponse(
                res,
                CodeStatus.Created,
                "Service created successfully",
                service
            );
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const data = req.query;

            if (data.id) {
                const room = await AdditionalService.getById(data.id);
                return responses.successResponse(
                    res,
                    CodeStatus.OK,
                    "Room retrieved successfully",
                    room
                );
            }

            const services = await AdditionalService.getAll();
            return responses.successResponse(
                res,
                CodeStatus.OK,
                "Services retrieved successfully",
                services
            );
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    edit: async (req, res, next) => {
        try {
            const data = req.body;
            const id = req.params.id;

            const service = await AdditionalService.update(id, data);
            return responses.successResponse(
                res,
                CodeStatus.OK,
                "Service updated successfully",
                service
            );
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },
};

export default AdditionalServiceController;