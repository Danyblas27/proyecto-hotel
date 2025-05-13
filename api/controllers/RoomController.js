import { Room } from "../models/index.js";
import { CodeStatus } from "../utils/index.js";

class RoomController {
    constructor(roomService) {
        this.roomService = roomService; // puedes omitir si no usas capa service
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const room = await Room.save(data);
            res.status(CodeStatus.Created).json({ message: "Room created", data: room });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }

    static async getRoom(req, res) {
        try {
            const room = await Room.getById(req.params.id);
            if (!room) return res.status(CodeStatus.NotFound).json({ message: "Room not found" });
            res.status(CodeStatus.OK).json(room);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }

    static async getAllRooms(req, res) {
        try {
            const rooms = await Room.getAll();
            res.status(CodeStatus.OK).json(rooms);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const updated = await Room.update(req.params.id, req.body);
            res.status(CodeStatus.OK).json({ message: "Room updated", data: updated });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await Room.delete(req.params.id);
            res.status(CodeStatus.OK).json({ message: "Room deleted" });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }

    static async toggleAvailability(req, res) {
        try {
            const { available } = req.body;
            await Room.toggleAvailability(req.params.id, available);
            res.status(CodeStatus.OK).json({ message: "Availability updated" });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }
}

export default RoomController;
