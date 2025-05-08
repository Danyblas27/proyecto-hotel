import queryHelper from "../database/queryHelper.js";
import { HashBcrypt } from "../utils/index.js";


class User {

    constructor(data) {
        this.name = data.name || '';
        this.email = data.email || '';
        this.password = data.password || '';
        this.role = data.role || '';
    }

    static fromJson(json) {
        return new User({
            name: json.name,
            email: json.email,
            password: json.password,
            role: json.role
        });
    }

    static async saveUser(data) {
        const hashedPassword = await HashBcrypt.hashPassword(data.password);
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const params = [data.name, data.email, hashedPassword, data.role];
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

    static async getUsers() {
        const sql = `SELECT id, name, email, role FROM users`;
        const params = [];
        return queryHelper.query(sql, params)
            .then(([rows, fields]) => {

                if (!rows.length > 0) {
                    throw new Error('No users found');
                }

                return rows.map(user => User.fromJson(user));
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                throw err;
            });
    }

    static async getUserByEmail(email) {
        const sql = `SELECT name, email, password, role FROM users WHERE email = ?`;
        const params = [email];
        return queryHelper.query(sql, params)
            .then(([rows, fields]) => {
                if (!rows.length > 0) {
                    throw new Error('User not found');
                }

                return User.fromJson(rows[0]);
            })
            .catch(err => {
                console.error('Error fetching user:', err);
                throw err;
            });
    }

    static async existUserWithEmail(email) {
        const sql = `SELECT id FROM users WHERE email = ?`;
        const params = [email];

        return queryHelper.query(sql, params)
            .then(([rows]) => {
                if (!rows[0].id) {
                    return false;
                }
                return true;
            })
            .catch(err => {
                console.error('Error fetching user:', err);
                throw err;
            });
    }
}

export default User;