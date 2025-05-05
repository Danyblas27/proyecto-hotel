const http = require('http');
const server = http.createServer((req, res) =>
{
res.writeHead(200, {'Content-Type':
'text/html'});
res.end('<h1 style="aling:center">Hola mundo desde nodeJS</h1>');
});
//asignarle un puerto para probar
const port = 3000;
server.listen(port, () => {
console.log(`Servidor corriendo en
http://localhost:${port}/`);
});