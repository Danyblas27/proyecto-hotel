const bodyParser = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                try {
                    resolve(JSON.parse(body));
                } catch (err) {
                    reject(new Error("JSON inválido en el cuerpo de la solicitud"));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

export default bodyParser;
