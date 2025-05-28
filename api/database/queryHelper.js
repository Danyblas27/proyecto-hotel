import db from './db.js';

const queryHelper = {
    async query(sql, params = []){
        try {
            const rows = await db.query(sql, params);
            return rows;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    },

    async insert(sql, params = []) {
        try {
            const [result] = await db.query(sql, params);
            return result.insertId;
        } catch (error) {
            console.error('Database insert error:', error);
            throw error;
        }
    },

    async update(sql, params = []) {
        try {
            const [result] = await db.query(sql, params);
            return result.affectedRows;
        } catch (error) {
            console.error('Database update error:', error);
            throw error;
        }
    },

    async delete(sql, params = []) {
        try {
            const [result] = await db.query(sql, params);
            return result.affectedRows;
        } catch (error) {
            console.error('Database delete error:', error);
            throw error;
        }
    },

}

export default queryHelper;