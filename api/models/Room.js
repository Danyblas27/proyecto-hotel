import queryHelper from "../database/queryHelper.js";
import { validateFields } from "../utils/validateFields.js";

class Room {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.number = data.number;
        this.capacity = data.capacity;
        this.price = data.price;
        this.description = data.description;
        this.available = data.available ?? true;
    }

    static fromJson(json) {
        return new Room(
            json.id,
            json.type,
            json.number,
            json.capacity,
            json.price,
            json.description,
            json.available
        );
    }

    toJson() {
        return {
            id: this.id,
            type: this.type,
            number: this.number,
            capacity: this.capacity,
            price: this.price,
            description: this.description,
            available: this.available
        };
    }

    static fromJsonArray(jsonArray) {
        return jsonArray.map(Room.fromJson);
    }

    static async save(data) {

        const names = [
            "type",
            "number",
            "capacity",
            "price",
            "description"
        ];
        validateFields(names, data);

        const sql = `INSERT INTO rooms (
                        type,
                        number,
                        capacity, 
                        price, 
                        description
                    ) VALUES (?, ?, ?, ?, ?)`;
        const params = [
            data.type,
            data.number,
            data.capacity,
            data.price,
            data.description
        ];


        return queryHelper.query(sql, params)
            .then(result => {
                return new Room({
                    id: result.insertId,
                    ...data
                });
            })
            .catch(err => {
                console.error('Error getting client by email:', err);
                throw err;
            });
    }


    static async getById(id) {
        const sql = `SELECT 
                        r.id,
                        r.type,
                        r.number,
                        r.capacity, 
                        r.price, 
                        r.description,
                        r.available
        FROM rooms as r WHERE r.id = ?`;

        return await queryHelper.query(sql, [id])
            .then(([rows, field]) => {

                if (rows.length === 0) {
                    throw new Error('No Room found');
                }

                return new Room(rows[0]);
            })
            .catch(err => {
                console.error('Error getting Room:', err);
                throw err;
            });
    }

    static async existById(id) {
        const sql = `SELECT id FROM rooms WHERE id = ?`;
        const params = [id];
        return queryHelper.query(sql, params)

            .then(([rows]) => {
                if (!rows || rows.length === 0 || !rows[0]) {
                    return false;
                }
                return true;
            })
            .catch(err => {
                console.error('Error checking room existence:', err);
                throw err;
            });
    }

    static async getByNumber(number) {
        const sql = `SELECT 
                        r.id,
                        r.type,
                        r.number,
                        r.capacity, 
                        r.price, 
                        r.description,
                        r.available
         FROM rooms as r WHERE r.number = ?`;

        return await queryHelper.query(sql, [number])
            .then(([rows, field]) => {

                if (rows.length === 0) {
                    throw new Error('No Room found');
                }

                return new Room(rows[0]);
            })
            .catch(err => {
                console.error('Error getting Room:', err);
                throw err;
            });
    }

    static async getAll() {
        const sql = `SELECT 
                        r.id,
                        r.type,
                        r.number,
                        r.capacity, 
                        r.price, 
                        r.description,
                        r.available
                    FROM rooms as r`;
        return await queryHelper.query(sql)
            .then(([rows, field]) => {
                if (rows.length === 0) {

                    throw new Error('No Rooms found');
                }
                return rows.map(row => new Room(row));
            })
            .catch(err => {
                console.error('Error getting Rooms:', err);
                throw err;
            });
    }

    static async update(id, data) {

        const sql = `UPDATE rooms SET 
                        type = ?, 
                        capacity = ?, 
                        price = ?, 
                        description = ?, 
                        available = ? 
                    WHERE id = ?`;
        const params = [
            data.type,
            data.capacity,
            data.price,
            data.description,
            data.available,
            id
        ];
        await queryHelper.query(sql, params);
        return this.getById(id);
    }

    static async delete(id) {
        const sql = `DELETE FROM rooms WHERE id = ?`;
        return await queryHelper.query(sql, [id])
            .then(([rows, fields]) => {
                if (rows.affectedRows === 0) {
                    throw new Error('Room not found');
                }
                return true;
            })
            .catch(err => {
                console.error('Error deleting Room:', err);
                throw err;
            });
    }

    static async toggleAvailability(id, status) {
        const sql = `UPDATE rooms SET available = ? WHERE id = ?`;
        return queryHelper.query(sql, [status, id]);
    }
}

export default Room;
