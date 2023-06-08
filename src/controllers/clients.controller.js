import { insertClient, pickOrdersByClientId, verifyClientId } from "../repositories/clients.repository.js";

export async function postClient(req, res) {
    const { name, adress, phone } = req.body 
    try {
        await insertClient(name, adress, phone)

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getOrdersByClientId(req, res) {
    const {clientId} = req.params;

    try {
        const clientExists = await verifyClientId(clientId);
        if (!clientExists.rows[0]) return res.sendStatus(404); 

        const orderByClient = await pickOrdersByClientId(clientId);

        res.status(200).send(orderByClient.rows);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}