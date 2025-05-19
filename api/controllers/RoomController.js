import { responses } from "../middleware/index.js";
import { Room } from "../models/index.js";
import { CodeStatus } from "../utils/index.js";


class RoomController {
    constructor(roomService) {
        this.type = type;
        this.number = number;
        this.capacity = capacity;
        this.price = price;
        this.description = description;
        this.available = available;
    }

    static async create(req, res, next) {
        try {
            const data = req.body;
            const room = await Room.save(data);
            res.status(CodeStatus.Created).json({ message: "Room created", data: room });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async show(req, res, next) {
        try {
            
            const data = req.query;
            
            if (data.id) {
                const room = await Room.getById(data.id);
                responses.successResponse(res, CodeStatus.OK, "Room retrieved successfully", room);
                return;
            }

            if (data.number) {
                const room = await Room.getByNumber(data.number);
                responses.successResponse(res, CodeStatus.OK, "Room retrieved successfully", room);
                return;
            }

            
            const rooms = await Room.getAll();
            responses.successResponse(res, CodeStatus.OK, "Rooms retrieved successfully", rooms);

        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async getAllRooms(req, res) {
        try {
            const rooms = await Room.getAll();
            res.status(CodeStatus.OK).json(rooms);
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async update(req, res) {
        try {
            const updated = await Room.update(req.params.id, req.body);
            res.status(CodeStatus.OK).json({ message: "Room updated", data: updated });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async delete(req, res) {
        try {
            await Room.delete(req.params.id);
            res.status(CodeStatus.OK).json({ message: "Room deleted" });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async toggleAvailability(req, res) {
        try {
            const { available } = req.body;
            await Room.toggleAvailability(req.params.id, available);
            res.status(CodeStatus.OK).json({ message: "Availability updated" });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }
}

export default RoomController;
