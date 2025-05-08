export const errorResponse = (res, statusCode, message) => {
    const validCode = typeof statusCode === "number" ? statusCode : 500;
    res.status(validCode).json({
        success: false,
        status: validCode,
        code: message.code || "INTERNAL_SERVER_ERROR",
        error: message,
    });
};
