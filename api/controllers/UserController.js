import { User } from "../models/index.js";
import { responses } from "../middleware/index.js";
import { CodeStatus } from "../utils/index.js";


const UserController = {

    create: async (req, res, next) => {
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

            const newUser = await User.save(data);
            responses.successResponse(res, CodeStatus.Created, "Client created successfully", newUser);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    edit: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const user = await User.getUserById(id);
            if (!user) {
                return res.status(CodeStatus.NotFound).json({
                    status: CodeStatus.NotFound,
                    code: "USER_NOT_FOUND",
                    message: "User not found"
                });
            }

            const updatedUser = await User.update(id, data);
            responses.successResponse(res, CodeStatus.OK, "User updated successfully", updatedUser);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {

            const users = await User.getUsers();
            responses.successResponse(res, CodeStatus.OK, "Users fetched successfully", users);

        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    trash: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await User.getUserById(id);
            if (!user) {
                return res.status(CodeStatus.NotFound).json({
                    status: CodeStatus.NotFound,
                    code: "USER_NOT_FOUND",
                    message: "User not found"
                });
            }

            await User.delete(id);
            responses.successResponse(res, CodeStatus.OK, "User trashed successfully");
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },
    // getInfoUser: async (req, res, next) => {
    //     try {
    //         const user = req.user;
    //         responses.successResponse(res, CodeStatus.OK, "User info fetched successfully", user);
    //     } catch (error) {
    //         error.code = error.code || CodeStatus.ServerError;
    //         next(error);
    //     }
    // }

}

export default UserController;