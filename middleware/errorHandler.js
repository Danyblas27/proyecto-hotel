const sendErrorResponse = (res, status = 500, message = "Error del servidor") => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: message }));
};

export default sendErrorResponse;
