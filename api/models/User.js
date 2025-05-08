import queryHelper from "../database/queryHelper.js";
import { HashBcrypt } from "../utils/index.js";


class User {

    constructor(data) {
        this.name = data.name || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.rol = data.rol || '';
    }

    static fromJson(json) {
        return new User({
            name: json.name,
            email: json.email,
            password: json.password,
            rol: json.rol
        });
    }

    static async saveUser(data) {
        const hashedPassword = await HashBcrypt.hashPassword(data.password);
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const params = [data.name, data.email, hashedPassword, data.rol];
        return queryHelper.query(sql, params)
            .then(result => {
                return new User({
                    id: result.insertId,
                    ...data
                });
            })
            .catch(err => {
                console.error('Error saving user:', err);
                throw err;
            });
    }
}

export default User;