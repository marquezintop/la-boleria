import { insertCake, verifyCakeName } from "../repositories/cakes.repository.js";

export async function postCake(req, res) {
    const { name, price, image, description } = req.body 
    try {
        const cakeNameExists = await verifyCakeName(name);
        if(cakeNameExists.rows[0]) return res.sendStatus(409);

        await insertCake(name, price, image, description);
        
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err);
    }
}