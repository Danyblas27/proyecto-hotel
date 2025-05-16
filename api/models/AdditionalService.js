import queryHelper from "../database/queryHelper.js";

class AdditionalService {
    constructor(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.description = data.description || '';
        this.price = data.price || 0.0;
    }

    static async save(data) {
        const sql = `INSERT INTO additional_services (name, description, price) VALUES (?, ?, ?)`;
        const params = [data.name, data.description, data.price];
        return queryHelper.query(sql, params)
            .then(([result]) => new AdditionalService({ ...data, id: result.insertId }))
            .catch(err => { throw err; });
    }

    static async getAll() {
        const sql = `SELECT * FROM additional_services`;
        return queryHelper.query(sql, []).then(([rows]) => rows);
    }
}

export default AdditionalService;