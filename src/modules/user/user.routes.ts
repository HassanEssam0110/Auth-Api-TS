import { Router } from "express";
import * as middlewares from "../../middlewares/index.middlewares";
import * as controller from "./user.controller";
import * as schema from "./user.schema";
import { SYSTEM_ROLES } from "../../utils/index.utils";

const userRouter: Router = Router();

userRouter.get(
  "/me",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.USER),
  controller.getMe
);

userRouter.patch(
  "/me",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.USER),
  middlewares.validate(schema.updateMeSchema),
  controller.updateMe
);

userRouter.delete(
  "/me",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.USER),
  controller.deleteMe
);

userRouter.patch(
  "/me/password",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.USER),
  middlewares.validate(schema.changeMePasswordSchema),
  controller.changeMePassword
);

export default userRouter;
