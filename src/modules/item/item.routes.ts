import { Router } from "express";
import * as middlewares from "../../middlewares/index.middlewares";
import * as controller from "./item.controller";
import * as schema from "./item.schema";
import { SYSTEM_ROLES } from "../../utils/index.utils";

const itemRouter: Router = Router();

itemRouter.get(
  "/",
  middlewares.allowTo(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.USER),
  controller.getItems
);

itemRouter.post(
  "/",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.ADMIN),
  middlewares.validate(schema.createItemSchema),
  controller.createItem
);

itemRouter.get(
  "/:id",
  middlewares.allowTo(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.USER),
  middlewares.validate(schema.getItemSchema),
  controller.getItem
);

itemRouter.put(
  "/:id",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.ADMIN),
  middlewares.validate(schema.updateItemSchema),
  controller.updateItem
);

itemRouter.delete(
  "/:id",
  middlewares.auth,
  middlewares.allowTo(SYSTEM_ROLES.ADMIN),
  middlewares.validate(schema.deleteItemSchema),
  controller.deleteItem
);

export default itemRouter;
