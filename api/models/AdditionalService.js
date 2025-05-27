import queryHelper from "../database/queryHelper.js";
import { validateFields } from "../utils/validateFields.js";

class AdditionalService {
    constructor(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.description = data.description || '';
        this.price = data.price || 0.0;
    }

    static async save(data) {

        const names = [
            "name",
            "description",
            "price"
        ];
        validateFields(names, data);

        const sql = `INSERT INTO additional_services (
                        name, 
                        description, 
                        price
                    ) VALUES (?, ?, ?)`;
        const params = [
            data.name,
            data.description,
            data.price
        ];
        return queryHelper.query(sql, params)
            .then(([result]) =>
                new AdditionalService({
                    ...data,
                    id: result.insertId
                }))
            .catch(err => { throw err; });
    }

    static async getAll() {
        const sql = `SELECT * FROM additional_services`;
        return queryHelper.query(sql, [])
            .then(([rows]) => {
                if (rows.length === 0) {
                    throw new Error('No services found');
                }
                return rows.map(
                    row => new AdditionalService(row)
                );
            })
            .catch(err => { throw err; });
    }

    static async getById(id) {
        const sql = `SELECT * FROM additional_services WHERE id = ?`;
        return queryHelper.query(sql, [id])
            .then(([rows]) => {
                if (rows.length === 0) {
                    throw new Error('Service not found');
                }
                return new AdditionalService(rows[0]);
            })
            .catch(err => { throw err; });
    }
    static async update(id, data) {

        const sql = `UPDATE additional_services 
                    SET name = ?, description = ?, price = ? 
                    WHERE id = ?`;

        const params = [
            data.name,
            data.description,
            data.price,
            id
        ];
        return queryHelper.query(sql, params)
            .then(async () => new AdditionalService(await this.getById(id)))
            .catch(err => { throw err; });
    }
}

export default AdditionalService;