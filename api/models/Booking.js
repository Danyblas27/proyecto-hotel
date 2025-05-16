import queryHelper from "../database/queryHelper.js";

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
    }

    static async save(data) {
        const sql = `INSERT INTO bookings (entry_date, departure_date, status, room_id, client_id, user_id, total_amount, id_doc_official, pay_method_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
            .then(([result]) => new Booking({ ...data, id: result.insertId }))
            .catch(err => { throw err; });
    }

    static async getById(id) {
        const sql = `SELECT * FROM bookings WHERE id = ?`;
        return queryHelper.query(sql, [id])
            .then(([rows]) => rows[0] || null);
    }
}

export default Booking;