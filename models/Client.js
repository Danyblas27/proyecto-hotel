import queryHelper from '../database/queryHelper.js';

class Client {
    constructor(data) {
        this.id = data.id,
            this.email = data.email,
            this.name = data.name,
            this.lastName = data.lastName,
            this.country = data.country,
            this.codeNumber = data.codeNumber,
            this.telephoneNumber = data.telephoneNumber,
            this.typeDocOfficial = data.typeDocOfficial,
            this.idDocOfficial = data.idDocOfficial
    }

    static async saveClient(data) {
        // if (!data.nombre) {
        //     const error = new Error("El nombre es obligatorio");
        //     error.code = CodeStatus.BadRequest; // 400
        //     throw error;
        // }

        const sql = `INSERT INTO clients (email, name, last_name, country, code_number, telephone_number, type_doc_official, id_doc_official) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [data.email, data.name, data.lastName, data.country, data.codeNumber, data.telephoneNumber, data.typeDocOfficial, data.idDocOfficial];
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

    static getClient(client) {
        // logic
    }
    static async getClients(clients) {

        const sql = `SELECT c.id, c.email, c.name, c.lastName, c.country, c.codeNumber, c.telephoneNumber, c.typeDocOfficial, c.idDocOfficial FROM clients AS c`;
        return await queryHelper.query(sql);

    }
    static getClientByEmail(client) {
        // logic
    }
    static getClientById(client) {
        // logic
    }

}

export default Client;