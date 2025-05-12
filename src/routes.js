import { Router } from "express";

import order from "./middlewares/order.js";
import hateoas from "./middlewares/hateoas.js";
import handler from "./middlewares/handlers.js";

import InternalServerError from "./routes/helper/500.js"
import NotFound from "./routes/helper/404.js";

import AuthRouter from "./routes/authRouter.js";
import UserRouter from "./routes/userRouter.js";
import ProductRouter from "./routes/productRouter.js";
import TaskRouter from "./routes/taskRoute.js";

import { verify } from "./controllers/authController.js";

const routes = Router()
routes.use(order);
routes.use(hateoas);
routes.use(handler);

routes.use("/login", AuthRouter);
routes.use("/api/users", verify, UserRouter);
routes.use("api/products",verify, ProductRouter)
routes.use("/api/tasks", TaskRouter);

routes.use(InternalServerError);
routes.use(NotFound);

export default routes;
