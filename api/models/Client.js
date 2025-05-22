import queryHelper from '../database/queryHelper.js';
import { CodeStatus, validateFields } from '../utils/index.js';

class Client {
    constructor(data) {
        this.email = data.email,
            this.name = data.name,
            this.lastName = data.lastName,
            this.country = data.country,
            this.codeNumber = data.codeNumber,
            this.telephoneNumber = data.telephoneNumber,
            this.typeDocOfficial = data.typeDocOfficial,
            this.idDocOfficial = data.idDocOfficial
    }

    static async save(data) {

        const names = [
            "email",
            "name",
            "lastName",
            "country",
            "codeNumber",
            "telephoneNumber",
            "typeDocOfficial",
            "idDocOfficial"
        ];

        validateFields(names, data);

        const sql = `INSERT INTO clients (
                                    email, 
                                    name, 
                                    last_name,
                                    country, 
                                    code_number, 
                                    telephone_number,
                                    type_doc_official, 
                                    id_doc_official
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            data.email,
            data.name,
            data.lastName,
            data.country,
            data.codeNumber,
            data.telephoneNumber,
            data.typeDocOfficial,
            data.idDocOfficial
        ];
        return queryHelper.query(sql, params)
            .then(result => {
                return new Client({
                    id: result.insertId,
                    ...data
                });
            })
            .catch(err => {
                console.error('Error saving client:', err);
                throw err;
            });
    }

    static async update(data) {
        const sql = `UPDATE clients SET 
                            email = ?, 
                            name = ?, 
                            last_name = ?, 
                            country = ?, 
                            code_number = ?, 
                            telephone_number = ?, 
                            type_doc_official = ?, 
                            id_doc_official = ? 
                    WHERE id = ?`;
        const params = [
            data.email,
            data.name,
            data.lastName,
            data.country,
            data.codeNumber,
            data.telephoneNumber,
            data.typeDocOfficial,
            data.idDocOfficial,
            data.id
        ];
        return queryHelper.query(sql, params)
            .then(([rows, fields]) => {
                return new Client({
                    ...data
                });
            })
            .catch(err => {
                console.error('Error updating client:', err);
                throw err;
            });
    }


    static async getClientById(id) {
        const sql = `SELECT 
                        c.id, 
                        c.email, 
                        c.name, 
                        c.lastName, 
                        c.country, 
                        c.codeNumber, 
                        c.telephoneNumber, 
                        c.typeDocOfficial, 
                        c.idDocOfficial 
                        FROM clients AS c WHERE id = ?`;
        const params = [id];
        return queryHelper.query(sql, params)
            .then(result => {
                if (result.length === 0) {
                    throw new Error('Client not found');
                }
                return new Client(result[0]);
            })
            .catch(err => {
                console.error('Error getting client:', err);
                throw err;
            });
    }
    static async getClients() {
        const sql = `SELECT 
                        c.id, 
                        c.email, 
                        c.name, 
                        c.last_name, 
                        c.country, 
                        c.code_number, 
                        c.telephone_number, 
                        c.type_doc_official, 
                        c.id_doc_official 
                    FROM clients AS c`;
        return await queryHelper.query(sql)
            .then(([rows, field]) => {
                // console.log(field);
                if (rows.length === 0) {
                    throw new Error('No clients found');
                }
                return rows.map(row => new Client(row));
            })
            .catch(err => {
                console.error('Error getting clients:', err);
                throw err;
            });

    }
    static getClientByEmail(email) {
        const sql = `SELECT 
                        c.id, 
                        c.email, 
                        c.name, 
                        c.last_name, 
                        c.country, 
                        c.code_number, 
                        c.telephone_number, 
                        c.type_doc_official, 
                        c.id_doc_official
                    FROM clients AS c WHERE email = ?`;
        const params = [email];
        return queryHelper.query(sql, params)
            .then(([rows, field]) => {
                if (rows.length === 0) {
                    throw new Error('Client not found');
                }
                return new Client(rows[0]);
            })
            .catch(err => {
                console.error('Error getting client by email:', err);
                throw err;
            });
    }
    static getClientById(client) {
        // logic
    }

}

export default Client;