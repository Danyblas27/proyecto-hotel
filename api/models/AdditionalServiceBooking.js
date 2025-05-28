import queryHelper from "../database/queryHelper.js";
import AdditionalService from "./AdditionalService.js";

class AdditionalServiceBooking {
    constructor(data) {
        this.id = data.id || null;
        this.booking_id = data.booking_id;
        this.additional_service_id = data.additional_service_id;
        this.price = data.price || 0.0;
    }

    static async save(bookingId, additionalServiceId) {

        if (!bookingId || !additionalServiceId) {
            throw new Error("Booking ID and Additional Service ID are required");
        }

        const checkSql = `
            SELECT 1 FROM additional_services_booking
            WHERE booking_id = ? AND additional_service_id = ?
            LIMIT 1
        `;
        const [existing] = await queryHelper.query(checkSql, [bookingId, additionalServiceId]);

        if (existing.length > 0) {
            throw new Error("This additional service is already associated with the booking.");
        }

        const service = await AdditionalService.getById(additionalServiceId);
        if (!service) {
            throw new Error("Additional service not found.");
        }

        const price = service.price;

        const sql = `INSERT INTO additional_services_booking (
                        booking_id, 
                        additional_service_id, 
                        price
                        ) VALUES (?, ?, ?)`;
        const params = [bookingId, additionalServiceId, price];
        return queryHelper.query(sql, params)
            .then(([result]) => new AdditionalServiceBooking({
                booking_id: bookingId,
                additional_service_id: additionalServiceId,
                price: price,
                id: result.insertId
            }))
            .catch(err => { throw err; });
    }

    static async getByBookingId(bookingId) {
        const sql = `SELECT * FROM additional_services_booking WHERE booking_id = ?`;
        return queryHelper.query(sql, [bookingId])
            .then(([rows]) => rows);
    }
    static async delete(bookingId, additionalServiceId) {
        if (!bookingId || !additionalServiceId) {
            throw new Error("Booking ID and Additional Service ID are required for deletion.");
        }
    
        const checkSql = `
        SELECT id FROM additional_services_booking
        WHERE booking_id = ? AND additional_service_id = ?
        LIMIT 1
        `;
        const [existing] = await queryHelper.query(checkSql, [bookingId, additionalServiceId]);

        if (existing.length === 0) {
            throw new Error("The additional service is not associated with the booking.");
        }

        const deleteSql = `
        DELETE FROM additional_services_booking
        WHERE booking_id = ? AND additional_service_id = ?
        `;
        await queryHelper.query(deleteSql, [bookingId, additionalServiceId]);

        return { success: true, message: "Additional service removed from booking." };
    }

}

export default AdditionalServiceBooking;
