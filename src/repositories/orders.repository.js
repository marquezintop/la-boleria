import { db } from "../database/database.connection.js";


export async function insertOrder (clientId, cakeId, quantity, totalPrice) {
    return db.query(`
    INSERT INTO orders
    ("clientId", "cakeId", quantity, "totalPrice")
    VALUES ($1, $2, $3, $4)
    `, [clientId, cakeId, quantity, totalPrice]);
};

export async function verifyOrderId (id) {
    return db.query(`
    SELECT *
    FROM orders
    WHERE id = $1`, 
    [id]);
};

export async function pickOrders() {
    return db.query(`SELECT clients.id AS client_id,
    clients.name AS client_name,
    clients.adress,
    clients.phone,
    cakes.id AS cake_id,
    cakes.name AS cake_name,
    cakes.price,
    cakes.description,
    cakes.image,
    orders.id AS order_id,
    orders.quantity,
    orders."createdAt",
    orders."totalPrice"
    FROM orders
    JOIN clients
        ON clients.id = orders."clientId"
    JOIN cakes 
        ON cakes.id = orders."cakeId";`)
};