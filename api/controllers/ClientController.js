

import { responses } from "../middleware/index.js";
import { Client } from "../models/index.js";
import { CodeStatus } from "../utils/index.js";


const ClientController = {

    create: async (req, res, next) => {

        try {
            const data = req.body;
            const newClient = await Client.save(data);
            console.log("hole");
            responses.successResponse(res, CodeStatus.Created, "Client created successfully", newClient);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const data = req.body;
            const updatedClient = await Client.update(data);
            responses.successResponse(res, CodeStatus.OK, "Client updated successfully", updatedClient);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const data = req.query;

            if (data.email) {
                const client = await Client.getClientByEmail(data.email);
                responses.successResponse(res, CodeStatus.OK, "Client retrieved successfully", client);
                return;
            }

            const client = await Client.getClients();
            responses.successResponse(res, CodeStatus.OK, "Clients retrieved successfully", client);

        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },


}

export default ClientController;

