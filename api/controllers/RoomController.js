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

    static async edit(req, res, next) {
        try {
            const data = req.body;

            if (data.number) {
                return res.status(CodeStatus.IncorrectRequest).json({
                    status: CodeStatus.IncorrectRequest,
                    code: "ROOM_NUMBER_UPDATE_ERROR",
                    message: "Room number cannot be updated"
                });
            }

            const updated = await Room.update(
                req.params.id,
                data
            );
            res.status(CodeStatus.OK).json({
                message: "Room updated",
                data: updated
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async trash(req, res, next) {
        try {
            const { id } = req.params;

            const room = await Room.getById(id);
            if (!room) {
                return res.status(CodeStatus.NotFound).json({
                    status: CodeStatus.NotFound,
                    code: "ROOM_NOT_FOUND",
                    message: "Room not found"
                });
            }

            await Room.delete(req.params.id);
            res.status(CodeStatus.OK).json({
                status: CodeStatus.OK,
                code: "ROOM_DELETED",
                message: "Room deleted"
            });

        } catch (error) {

            if (error.message === 'No Room found') {
                return res.status(CodeStatus.NotFound).json({
                    status: CodeStatus.NotFound,
                    code: "ROOM_NOT_FOUND",
                    message: "Room not found"
                });
            }
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

    static async toggleAvailability(req, res, next) {
        try {
            const { id, available } = req.params;
            
            if (!id || !available) {
                return res.status(CodeStatus.IncorrectRequest).json({
                    status: CodeStatus.IncorrectRequest,
                    code: "ROOM_AVAILABILITY_UPDATE_ERROR",
                    message: "Room ID and availability status are required"
                });
            }

            const isAvailable = Boolean(Number(available));

            await Room.toggleAvailability(id, isAvailable);
            res.status(CodeStatus.OK).json({
                status: CodeStatus.OK,
                code: "ROOM_AVAILABILITY_UPDATED",
                message: "Availability updated",
                data: { id: Number(id), isAvailable }
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }
}

export default RoomController;
