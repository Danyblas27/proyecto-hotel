import queryHelper from '../database/queryHelper.js';
class PayMethod {
    constructor(data) {
        this.id = data.id || null;
        this.type = data.type || '';
        this.description = data.description || '';
    }

    static async save(data) {
        const sql = `INSERT INTO pay_methods (type, description) VALUES (?, ?)`;
        const params = [data.type, data.description];
        return queryHelper.query(sql, params)
            .then(([result]) => new PayMethod({ ...data, id: result.insertId }))
            .catch(err => { throw err; });
    }

    static async getAll() {
        const sql = `SELECT * FROM pay_methods`;
        return queryHelper.query(sql, []).then(([rows]) => rows);
    }
}

export default PayMethod;