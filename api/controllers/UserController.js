

import { User } from "../models/index.js";
import { responses } from "../middleware/index.js";
import { bodyParser } from "../utils/index.js";


const UserController = {

    createUser: async (req, res) => {
        try {

            const data = await bodyParser(req);
            const newUser = await User.saveUser(data);
            responses.successResponse(res, CodeStatus.Created, "Client created successfully", newUser);
        } catch (error) {
            const statusCode = err.code || CodeStatus.ServerError;
            responses.errorHandler(res, statusCode, err.message);
        }
    }
}

export default UserController;