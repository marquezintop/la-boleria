import { insertClient } from "../repositories/clients.repository.js";

export async function postClient(req, res) {
    const { name, adress, phone } = req.body 
    try {
        await insertClient(name, adress, phone)

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}