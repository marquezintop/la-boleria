import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { clientSchema } from "../schemas/client.schema.js";
import { postClient } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateSchema(clientSchema), postClient);

export default clientsRouter;