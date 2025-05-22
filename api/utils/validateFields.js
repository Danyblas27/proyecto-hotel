// utils/validateFields.js
import { CodeStatus } from "./types/index.js";

export function validateFields(fields, data) {
    for (const field of fields) {
        const value = data[field];

        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
        ) {
            const error = new Error(`El campo '${field}' es obligatorio`);
            error.code = CodeStatus.BadRequest;
            throw error;
        }
    }
}
