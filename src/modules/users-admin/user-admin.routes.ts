import { Router } from "express";
import * as middlewares from "../../middlewares/index.middlewares";
import * as controller from "./user-admin.controller";
import * as schema from "./user-admin.schema";
import { SYSTEM_ROLES } from "../../utils/index.utils";

const adminUserRouter: Router = Router();

adminUserRouter.use(middlewares.auth, middlewares.allowTo(SYSTEM_ROLES.ADMIN));

adminUserRouter.get("/", controller.getUsers);

adminUserRouter.post(
  "/",
  middlewares.validate(schema.createUserSchema),
  controller.createUser
);

adminUserRouter.get(
  "/:id",
  middlewares.validate(schema.getUserSchema),
  controller.getUser
);

adminUserRouter.put(
  "/:id",
  middlewares.validate(schema.updateUserSchema),
  controller.updateUser
);

adminUserRouter.delete(
  "/:id",
  middlewares.validate(schema.deleteUserSchema),
  controller.deleteUser
);

export default adminUserRouter;
