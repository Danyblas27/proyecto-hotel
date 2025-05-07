import { CodeStatus } from "../../utils/index.js";


export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || CodeStatus.InternalServerError).json({
        message: err.message || 'Internal Server Error'
    });
};
