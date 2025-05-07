const sendErrorResponse = (res, status = 500, message = "Error del servidor") => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: message }));
};

export default sendErrorResponse;

// This function sends an error response in JSON format with a status code and message. It is used to handle errors in the application and provide a consistent response format for error handling.
// It sets the response headers to indicate that the content type is JSON and sends a JSON string with the error message.