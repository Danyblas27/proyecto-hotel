export const successResponse = (res, statusCode = 200, message = "Success", data = null) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        success: true,
        status: statusCode,
        message: message,
        data: data
    }));
}

// This function sends a success response in JSON format with a status code, message, and optional data.