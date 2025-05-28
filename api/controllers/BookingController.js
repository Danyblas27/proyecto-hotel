
import queryHelper from "../database/queryHelper.js";
import Booking from "../models/Booking.js";
import { CodeStatus } from "../utils/index.js";

const BookingController = {

    create: async (req, res, next) => {
        try {
            const data = {
                ...req.body,
                user_id: req.user.id,
            }
            const booking = await Booking.save(data);
            res.status(CodeStatus.Created).json({
                code: CodeStatus.Created,
                message: "Booking created successfully",
                data: booking
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.query;

            if (!id) {
                const bookings = await Booking.getAll();
                if (!bookings) {
                    return res.status(CodeStatus.NotFound).json({
                        code: CodeStatus.NotFound,
                        message: "No bookings found",
                        data: []
                    });
                }
                return res.status(CodeStatus.OK).json({
                    code: CodeStatus.OK,
                    message: "Bookings retrieved successfully",
                    data: bookings
                });
            }

            const bookings = await Booking.getById(id);
            res.status(CodeStatus.OK).json({
                code: CodeStatus.OK,
                message: "Booking retrieved successfully",
                data: bookings
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },
    // update: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const booking = await Booking.getById(id);
    //         if (!booking) {
    //             return res.status(CodeStatus.NotFound).json({ message: "Booking not found" });
    //         }

    //         const sql = `UPDATE bookings SET entry_date = ?, departure_date = ?, status = ?, room_id = ?, client_id = ?, user_id = ?, total_amount = ?, id_doc_official = ?, pay_method_id = ? WHERE id = ?`;
    //         const params = [
    //             req.body.entry_date,
    //             req.body.departure_date,
    //             req.body.status,
    //             req.body.room_id,
    //             req.body.client_id,
    //             req.body.user_id,
    //             req.body.total_amount,
    //             req.body.id_doc_official,
    //             req.body.pay_method_id,
    //             id
    //         ];

    //         await queryHelper.query(sql, params);
    //         const updated = await Booking.getById(id);
    //         res.status(CodeStatus.OK).json({ message: "Booking updated", data: updated });
    //     } catch (err) {
    //         res.status(CodeStatus.InternalServerError).json({ error: err.message });
    //     }
    // },

    updateStatus: async (req, res, next) => {
        try {
            const {id, status} = req.params;


            if (!id || !status) {
                return res.status(CodeStatus.BadRequest).json({
                    code: CodeStatus.BadRequest,
                    message: "Booking ID and status are required",
                    data: []
                });
            }

            const updated = await Booking.updateStatus(
                id,
                status
            );

            res.status(CodeStatus.OK).json({
                code: CodeStatus.OK,
                message: "Status updated",
                data: updated
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    updateKeyTime: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { type, time } = req.body;
            if (!id || !type || !time) {
                return res.status(CodeStatus.BadRequest).json({
                    code: CodeStatus.BadRequest,
                    message: "Booking ID, type, and time are required",
                    data: []
                });
            }

            const updated = await Booking.updateKeyTime(
                id, 
                type, 
                time
            );
            res.status(CodeStatus.OK).json({ 
                code: CodeStatus.OK,
                message: "Key time updated", 
                data: updated 
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    cancel: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(CodeStatus.BadRequest).json({
                    code: CodeStatus.BadRequest,
                    message: "Booking ID is required",
                    data: []
                });
            }
            const updated = await Booking.cancel(req.params.id);
            res.status(CodeStatus.OK).json({ 
                code: CodeStatus.OK,
                message: "Booking cancelled", 
                data: updated 
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    checkAvailability: async (req, res, next) => {
        try {
            const { entry_date, departure_date } = req.query;
            if (!entry_date || !departure_date) {
                return res.status(CodeStatus.BadRequest).json({
                    code: CodeStatus.BadRequest,
                    message: "Entry date and departure date are required",
                    data: []
                });
            }
            
            const rooms = await Booking.getAvailableRooms(entry_date, departure_date);
            res.status(CodeStatus.OK).json({
                message: "Available rooms retrieved",
                data: rooms
            });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    // Eliminar una reservación
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `DELETE FROM bookings WHERE id = ?`;
            const [result] = await queryHelper.query(sql, [id]);

            if (result.affectedRows === 0) {
                return res.status(CodeStatus.NotFound).json({ message: "Booking not found" });
            }

            res.status(CodeStatus.OK).json({ message: "Booking deleted" });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Reporte: Reservaciones por cliente
    reportByClient: async (req, res) => {
        try {
            const { client_id } = req.params;
            const sql = `SELECT * FROM bookings WHERE client_id = ?`;
            const [rows] = await queryHelper.query(sql, [client_id]);
            res.status(CodeStatus.OK).json(rows);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Reporte: Reservaciones por rango de fechas
    reportByDateRange: async (req, res) => {
        try {
            const { start, end } = req.query;
            const sql = `SELECT * FROM bookings WHERE entry_date >= ? AND departure_date <= ?`;
            const [rows] = await queryHelper.query(sql, [start, end]);
            res.status(CodeStatus.OK).json(rows);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Reporte: Estado de reservaciones (count por estado)
    reportStatusSummary: async (req, res) => {
        try {
            const sql = `
                SELECT status, COUNT(*) as total 
                FROM bookings 
                GROUP BY status
            `;
            const [rows] = await queryHelper.query(sql);
            res.status(CodeStatus.OK).json(rows);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Reporte: Ingresos mensuales
    reportMonthlyRevenue: async (req, res) => {
        try {
            const sql = `
                SELECT 
                    DATE_FORMAT(entry_date, '%Y-%m') AS month,
                    SUM(total_amount) AS revenue
                FROM bookings
                WHERE status = 'Completed'
                GROUP BY month
                ORDER BY month DESC
            `;
            const [rows] = await queryHelper.query(sql);
            res.status(CodeStatus.OK).json(rows);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    }
};

export default BookingController;
