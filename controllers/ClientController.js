import Client from "../models/Client";
import bodyParser from "../utils/bodyParser";

import * as responses from "../middleware/response";
import CodeStatus from "../utils/types/codeStatus";


const ClientController = {

    createClient: async (req, res) => {
        try {
            const data = await bodyParser(req);
            const newClient = await Client.saveClient(data);
            responses.successResponse(res, CodeStatus.Created , "Client created successfully", newClient);
        } catch (err) {
            const statusCode = err.code || CodeStatus.ServerError;
            responses.errorHandler(res, statusCode, err.message);
        }
    },


} 

export default ClientController;

