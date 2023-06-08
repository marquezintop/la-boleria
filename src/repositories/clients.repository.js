import { db } from "../database/database.connection.js";

export async function insertClient (name, adress, phone) {
    return db.query(`
    INSERT INTO clients
    (name, adress, phone)
    VALUES ($1, $2, $3)
    `, [name, adress, phone]);
};

export async function pickClientById (clientId) {
    return db.query(`
    SELECT *
    FROM clients
    WHERE id = $1
    `, [clientId]);
}