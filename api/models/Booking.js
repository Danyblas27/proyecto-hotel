import queryHelper from "../database/queryHelper.js";
import { CodeStatus } from "../utils/index.js";
import { validateFields } from "../utils/validateFields.js";
import Client from "./Client.js";
import Room from "./Room.js";
import User from "./User.js";

class Booking {
    constructor(data) {
        this.id = data.id || null;
        this.entry_date = data.entry_date;
        this.departure_date = data.departure_date;
        this.status = data.status || 'Pending';
        this.room_id = data.room_id;
        this.client_id = data.client_id;
        this.user_id = data.user_id;
        this.total_amount = data.total_amount || 0.0;
        this.id_doc_official = data.id_doc_official || '';
        this.pay_method_id = data.pay_method_id;
        this.key_handover_time = data.key_handover_time || null;
        this.key_reception_time = data.key_reception_time || null;
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
    }

    static async save(data) {

        const names = [
            'entry_date',
            'departure_date',
            'status',
            'room_id',
            'client_id',
            'user_id',
            'total_amount',
            'id_doc_official',
            'pay_method_id'
        ]
        validateFields(names, data);

        const existUser = await User.existById(data.user_id);
        if (!existUser) {
            throw new Error("User does not exist");
        }

        const existClient = await Client.existById(data.client_id);
        if (!existClient) {
            throw new Error("Client does not exist");
        }

        const existRoom = await Room.existById(data.room_id);
        if (!existRoom) {
            throw new Error("Room does not exist");
        }


        const sql = `INSERT INTO bookings (
                        entry_date, 
                        departure_date, 
                        status, 
                        room_id, 
                        client_id, 
                        user_id, 
                        total_amount, 
                        id_doc_official, 
                        pay_method_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            data.entry_date,
            data.departure_date,
            data.status,
            data.room_id,
            data.client_id,
            data.user_id,
            data.total_amount,
            data.id_doc_official,
            data.pay_method_id
        ];

        return queryHelper.query(sql, params)
            .then(([result]) => {
                if (result.affectedRows === 0) {
                    throw new Error("Failed to create booking");
                }
                return new Booking({ id: result.insertId, ...data });
            })
            .catch(err => { throw err; });
    }

    // static async update(data) {
    //     const sql = `UPDATE booking SET 
    //                         email = ?, 
    //                         name = ?, 
    //                         last_name = ?, 
    //                         country = ?, 
    //                         code_number = ?, 
    //                         telephone_number = ?, 
    //                         type_doc_official = ?, 
    //                         id_doc_official = ? 
    //                 WHERE id = ?`;
    //     const params = [
    //         data.email,
    //         data.name,
    //         data.lastName,
    //         data.country,
    //         data.codeNumber,
    //         data.telephoneNumber,
    //         data.typeDocOfficial,
    //         data.idDocOfficial,
    //         data.id
    //     ];
    //     return queryHelper.query(sql, params)
    //         .then(([rows, fields]) => {
    //             return new Client({
    //                 ...data
    //             });
    //         })
    //         .catch(err => {
    //             console.error('Error updating client:', err);
    //             throw err;
    //         });
    // }

    static async getById(id) {
        const sql = `SELECT
                        b.id,
                        b.entry_date,
                        b.departure_date,
                        b.status,
                        b.total_amount,
                        b.id_doc_official,
                        b.key_handover_time,
                        b.key_reception_time,
                        py.type AS pay_method_type,
                        r.number AS room_number,
                        r.type AS room_type,
                        c.name AS client_name,
                        c.last_name AS client_last_name,
                        u.id AS user_id,
                        u.name AS user_name 
                    FROM bookings b
                    INNER JOIN rooms r ON b.room_id = r.id
                    INNER JOIN clients c ON b.client_id = c.id
                    INNER JOIN users u ON b.user_id = u.id
                    INNER JOIN pay_methods py ON b.pay_method_id = py.id
                    WHERE b.id = ?`;
        return queryHelper.query(sql, [id])
            .then(([rows, field]) => {
                if (rows.length === 0) {
                    throw new Error('Booking not found');
                }
                return rows[0];
            })
            .catch(err => {
                console.error('Error getting Booking by id:', err);
                throw err;
            });
    }

    static async getAll() {

        const sql = `SELECT
                        b.id,
                        b.entry_date,
                        b.departure_date,
                        b.status,
                        b.total_amount,
                        b.id_doc_official,
                        b.key_handover_time,
                        b.key_reception_time,
                        py.type AS pay_method_type,
                        r.number AS room_number,
                        r.type AS room_type,
                        c.name AS client_name,
                        c.last_name AS client_last_name,
                        u.id AS user_id,
                        u.name AS user_name 
                    FROM bookings b
                    INNER JOIN rooms r ON b.room_id = r.id
                    INNER JOIN clients c ON b.client_id = c.id
                    INNER JOIN users u ON b.user_id = u.id
                    INNER JOIN pay_methods py ON b.pay_method_id = py.id`
            ;
        return queryHelper.query(sql)
            .then(([rows]) => rows);
    }

    static async updateStatus(id, status) {

        const VALID_STATUSES = [
            'Pending',
            'Confirmed',
            'Completed',
            'Cancelled',
        ];

        if (!VALID_STATUSES.includes(status)) {
            const error = new Error(`Invalid status: "${status}". Must be one of: ${VALID_STATUSES.join(', ')}`);
            error.code = CodeStatus.BadRequest;
            throw error;
        }

        const sql = `UPDATE bookings SET status = ? WHERE id = ?`;
        await queryHelper.query(sql, [status, id]);
        return this.getById(id);

    }

    static async updateKeyTime(id, type, time) {
        const column = type === 'handover' ? 'key_handover_time' : 'key_reception_time';
        const sql = `UPDATE bookings SET ${column} = ? WHERE id = ?`;
        await queryHelper.query(sql, [time, id]);
        return this.getById(id);
    }

    static async cancel(id) {
        return this.updateStatus(id, 'Cancelled');
    }

    static async getAvailableRooms(entry_date, departure_date) {

        const sql = `
            SELECT
                id 
            FROM rooms
            WHERE id NOT IN (
                SELECT room_id FROM bookings 
                WHERE NOT (
                    entry_date < ? AND departure_date > ?
                ) AND status IN ('Pending', 'Confirmed')
            )
        `;
        const [rows] = await queryHelper.query(sql, [entry_date, departure_date]);

        if (rows.length === 0) {
            throw new Error('Rooms not found');
        }
        
        const roomPromises = rows.map(row => Room.getById(row.id));
        const availableRooms = await Promise.all(roomPromises); // <- aquí sí se resuelven

        return availableRooms;
    }
}

export default Booking;