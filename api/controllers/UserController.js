import { User } from "../models/index.js";
import { responses } from "../middleware/index.js";
import { CodeStatus } from "../utils/index.js";


const UserController = {

    createUser: async (req, res, next) => {
        try {
            const data = req.body;
            const newUser = await User.saveUser(data);
            responses.successResponse(res, CodeStatus.Created, "Client created successfully", newUser);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error); 
        }
    }
}

export default UserController;