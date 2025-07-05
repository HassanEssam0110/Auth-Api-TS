import { Router } from "express";
import * as middlewares from "../../middlewares/index.middlewares";
import * as controller from "./auth.controller";
import * as schema from "./auth.schema";

const authRouter: Router = Router();

authRouter.post(
  "/login",
  middlewares.validate(schema.loginSchema),
  controller.login
);

authRouter.post(
  "/register",
  middlewares.validate(schema.registerSchema),
  controller.register
);

export default authRouter;
