import queryHelper from "../database/queryHelper.js";

class AdditionalServicesBooking {
    constructor(data) {
        this.id = data.id || null;
        this.booking_id = data.booking_id;
        this.additional_service_id = data.additional_service_id;
        this.price = data.price || 0.0;
    }

    static async save(data) {
        const sql = `INSERT INTO additional_services_booking (booking_id, additional_service_id, price) VALUES (?, ?, ?)`;
        const params = [data.booking_id, data.additional_service_id, data.price];
        return queryHelper.query(sql, params)
            .then(([result]) => new AdditionalServicesBooking({ ...data, id: result.insertId }))
            .catch(err => { throw err; });
    }

    static async getByBookingId(bookingId) {
        const sql = `SELECT * FROM additional_services_booking WHERE booking_id = ?`;
        return queryHelper.query(sql, [bookingId])
            .then(([rows]) => rows);
    }
}

export default AdditionalServicesBooking;
