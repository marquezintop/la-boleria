import { db } from "../database/database.connection.js";

export async function insertClient (name, adress, phone) {
    return db.query(`
    INSERT INTO clients
    (name, adress, phone)
    VALUES ($1, $2, $3);`, 
    [name, adress, phone]);
};

export async function pickClientById (clientId) {
    return db.query(`
    SELECT *
    FROM clients
    WHERE id = $1;`, 
    [clientId]);
}

export async function verifyClientId(clientId) {
    return db.query(`
    SELECT *
    FROM clients
    WHERE id = $1`, 
    [clientId]);
}

export async function pickOrdersByClientId (clientId) {
    return db.query(`
    SELECT orders.id AS "orderId",
    orders.quantity,
    orders."createdAt",
    orders."totalPrice",
    cakes.name AS "cakeName"
    FROM clients
    JOIN orders
        on clients.id = orders."clientId"
    JOIN cakes
        ON cakes.id = orders."cakeId"
    WHERE clients.id = $1;`,
    [clientId])
}