import queryHelper from "../database/queryHelper.js";

class Room {
    constructor(id, type, capacity, price, description, available = true) {
        this.id = id;
        this.type = type;
        this.capacity = capacity;
        this.price = price;
        this.description = description;
        this.available = available;
    }

    static fromJson(json) {
        return new Room(
            json.id,
            json.type,
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
        const sql = `INSERT INTO rooms (type, capacity, price, description) VALUES (?, ?, ?, ?)`;
        const params = [data.type, data.capacity, data.price, data.description];
        const result = await queryHelper.query(sql, params);
        return new Room(result.insertId, data.type, data.capacity, data.price, data.description, true);
    }

    static async getById(id) {
        const sql = `SELECT * FROM rooms WHERE id = ?`;
        const result = await queryHelper.query(sql, [id]);
        return result.length > 0 ? Room.fromJson(result[0]) : null;
    }

    static async getAll() {
        const sql = `SELECT * FROM rooms`;
        const result = await queryHelper.query(sql);
        return Room.fromJsonArray(result);
    }

    static async update(id, data) {
        const sql = `UPDATE rooms SET type = ?, capacity = ?, price = ?, description = ?, available = ? WHERE id = ?`;
        const params = [data.type, data.capacity, data.price, data.description, data.available, id];
        await queryHelper.query(sql, params);
        return this.getById(id);
    }

    static async delete(id) {
        const sql = `DELETE FROM rooms WHERE id = ?`;
        return queryHelper.query(sql, [id]);
    }

    static async toggleAvailability(id, status) {
        const sql = `UPDATE rooms SET available = ? WHERE id = ?`;
        return queryHelper.query(sql, [status, id]);
    }
}

export default Room;
