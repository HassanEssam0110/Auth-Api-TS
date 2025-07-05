import { Express } from "express";
import itemRouter from "./item/item.routes";
import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";
import adminUserRouter from "./users-admin/user-admin.routes";
/**
 * @desc Registers all application routes.
 * @param app - The Express application instance.
 */
const mountRoutes = (app: Express): void => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/items", itemRouter);
  app.use("/api/v1/admin/users", adminUserRouter);
};

export default mountRoutes;
