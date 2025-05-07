import Client from "../models/Client.js";
import bodyParser from "../utils/bodyParser.js";


const clientRoute = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = await bodyParser(req);
            const client = await Client.saveClient(data);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(client));
        } catch (error) {
            console.error('Error al guardar cliente:', error);

            // Solo responde si no se envió respuesta antes
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error interno al guardar cliente' }));
            }
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Método no permitido' }));
    }
}

export default clientRoute;