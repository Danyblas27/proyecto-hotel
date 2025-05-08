import { User } from "../models/index.js";
import { responses } from "../middleware/index.js";
import { CodeStatus } from "../utils/index.js";


const UserController = {

    createUser: async (req, res, next) => {
        try {
            const data = req.body;
            
            const userExists = await User.existUserWithEmail(data.email);
            if (userExists) {
                return res.status(CodeStatus.Conflict).json({
                    status: CodeStatus.Conflict,
                    code: "USER_ALREADY_EXISTS",
                    message: "Email already exists by User"
                });
            }

            const newUser = await User.saveUser(data);
            responses.successResponse(res, CodeStatus.Created, "Client created successfully", newUser);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            
            const users = await User.getUsers();
            responses.successResponse(res, CodeStatus.OK, "Users fetched successfully", users);

        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },
}

export default UserController;