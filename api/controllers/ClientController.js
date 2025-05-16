

import { responses } from "../middleware/index.js";
import { Client } from "../models/index.js";
import { bodyParser, CodeStatus } from "../utils/index.js";

const ClientController = {

    createClient: async (req, res) => {
        try {
            const data = await bodyParser(req);
            const newClient = await Client.saveClient(data);
            responses.successResponse(res, CodeStatus.Created, "Client created successfully", newClient);
        } catch (err) {
            const statusCode = err.code || CodeStatus.ServerError;
            responses.errorHandler(res, statusCode, err.message);
        }
    },


}

export default ClientController;

