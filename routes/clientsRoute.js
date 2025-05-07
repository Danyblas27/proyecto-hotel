import ClientController from "../controllers/ClientController.js";
import CodeStatus from "../utils/types/codeStatus.js";



const clientRoute = async (req, res) => {

    if (req.method === 'POST') {
        if (req.method === 'POST') {
            await ClientController.createClient(req, res); 
        } else {
            responses.errorHandler(res, CodeStatus.MethodNotAllowed, "Método no permitido");
        }
    } 
}

export default clientRoute;