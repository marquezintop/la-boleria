import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { orderSchema } from "../schemas/order.schema.js";
import { getOrders, getOrdersById, postOrder } from "../controllers/orders.controller.js";
import { dateSchema } from "../schemas/client.schema.js";

const ordersRouter = Router();

ordersRouter.post("/orders", validateSchema(orderSchema), postOrder);
ordersRouter.get("/orders", validateSchema(dateSchema), getOrders);
ordersRouter.get("/orders/:id", getOrdersById);

export default ordersRouter;