
import { PayMethod } from "../models/index.js";
import { CodeStatus } from "../utils/index.js";

const PayMethodController = {
    create: async (req, res, next) => {
        try {
            const method = await PayMethod.save(req.body);
            res.status(CodeStatus.Created).json({ message: "Pay method created", data: method });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    show: async (req, res, next) => {
        try {
            const methods = await PayMethod.getAll();
            res.status(CodeStatus.OK).json(methods);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }
};

export default PayMethodController;