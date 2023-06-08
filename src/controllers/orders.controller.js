import moment from "moment/moment.js";
import { pickCakeById } from "../repositories/cakes.repository.js";
import { pickClientById } from "../repositories/clients.repository.js";
import { insertOrder, pickOrders, verifyOrderId } from "../repositories/orders.repository.js";

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body 
    try {
        const isClient = await pickClientById(clientId);
        if (!isClient.rows[0]) return res.sendStatus(404);

        const isCake = await pickCakeById(cakeId);
        if (!isCake.rows[0]) return res.sendStatus(404);

        await insertOrder(clientId, cakeId, quantity, totalPrice)

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await pickOrders();

        const ordersOrganized = []

        orders.rows.map(order => {
            const formattedDate = moment(order.createdAt).format('YYYY-MM-DD HH:mm');
            ordersOrganized.push({
            clients: {id: order.client_id, name: order.client_name, 
                adress: order.adress, phone: order.phone},
            cake: {id: order.cake_id, name: order.cake_name, price: order.price, 
                description: order.description, image: order.image},
            orderId: order.order_id, createdAt: formattedDate, totalPrice: order.totalPrice
            })})

        if (req.body.date) {
            const ordersByDate = ordersOrganized.filter(order => order.createdAt.startsWith(req.body.date));
            return res.status(404).send(ordersByDate);
        }

        res.status(200).send(ordersOrganized)
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getOrdersById(req, res) {
    const { orderId } = req.params;

    try {
        const orderExists = await verifyOrderId(orderId);
        if (!orderExists.rows[0]) return res.sendStatus(404);

        const orders = await pickOrders();

        const ordersOrganizedById = []

        orders.rows.map(order => {
            if(Number(orderId) === order.order_id) {
                const formattedDate = moment(order.createdAt).format('YYYY-MM-DD HH:mm');
                ordersOrganizedById.push({
                clients: {id: order.client_id, name: order.client_name, 
                    adress: order.adress, phone: order.phone},
                cake: {id: order.cake_id, name: order.cake_name, price: order.price, 
                    description: order.description, image: order.image},
                orderId: order.order_id, createdAt: formattedDate, totalPrice: order.totalPrice
                })
            }
        })

        res.status(200).send(ordersOrganizedById)
    } catch (err) {
        res.status(500).send(err);
    }
}

