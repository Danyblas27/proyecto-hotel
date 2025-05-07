import User from "../../models/User";
import bodyParser from "../../utils/bodyParser";


const UserController = {


    createUser: async (req, res) => {
        try {

            const data = await bodyParser(req);
            const User = User(data);

        } catch (error) {
            const statusCode = err.code || CodeStatus.ServerError;
            responses.errorHandler(res, statusCode, err.message);
        }
    }
}