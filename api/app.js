import http from 'http';
import clientRoute from './routes/clientsRoute.js';
// const router = require('./router.js');


const server = http.createServer((req, res) => {
    const url = req.url;

    if (url.startsWith('/api/clients')) {
        return clientRoute(req, res);
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mensaje: "Ruta general no encontrada" }));

});
//asignarle un puerto para probar
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});