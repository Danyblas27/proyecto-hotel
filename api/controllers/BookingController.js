import Booking from "../models/BookingModel.js";
import queryHelper from "../database/queryHelper.js";
import { CodeStatus } from "../utils/index.js";

const BookingController = {
    // Crear una reservación
    create: async (req, res, next) => {
        try {
            const data = req.body;
            const booking = await Booking.save(data);
            res.status(CodeStatus.Created).json({ message: "Booking created successfully", data: booking });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Obtener una reservación por ID
    getById: async (req, res, next) => {
        try {
            const booking = await Booking.getById(req.params.id);
            if (!booking) {
                return res.status(CodeStatus.NotFound).json({ message: "Booking not found" });
            }
            res.status(CodeStatus.OK).json(booking);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Listar todas las reservaciones
    getAll: async (req, res) => {
        try {
            const [rows] = await queryHelper.query(`SELECT * FROM bookings`);
            res.status(CodeStatus.OK).json(rows);
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
        }
    },

    // Actualizar una reservación
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.getById(id);
            if (!booking) {
                return res.status(CodeStatus.NotFound).json({ message: "Booking not found" });
            }

            const sql = `UPDATE bookings SET entry_date = ?, departure_date = ?, status = ?, room_id = ?, client_id = ?, user_id = ?, total_amount = ?, id_doc_official = ?, pay_method_id = ? WHERE id = ?`;
            const params = [
                req.body.entry_date,
                req.body.departure_date,
                req.body.status,
                req.body.room_id,
                req.body.client_id,
                req.body.user_id,
                req.body.total_amount,
                req.body.id_doc_official,
                req.body.pay_method_id,
                id
            ];

            await queryHelper.query(sql, params);
            const updated = await Booking.getById(id);
            res.status(CodeStatus.OK).json({ message: "Booking updated", data: updated });
        } catch (err) {
            res.status(CodeStatus.InternalServerError).json({ error: err.message });
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
