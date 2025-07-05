import { Express } from "express";
import mountRoutes from "./modules/mounts.modules";
import { setupErrorHandlers } from "./middlewares/index.middlewares";

/**
 * @desc Bootstraps the Express application by registering routes and error handlers.
 * @param {Express} app - The Express application instance to configure.
 * @param app - The Express application instance
 * @returns {void}
 *
 * @example
 * import express from "express";
 * import bootstrap from "./bootstrap";
 *
 * const app = express();
 * bootstrap(app);
 */
const bootstrap = (app: Express): void => {
  // Routes
  mountRoutes(app);

  // Error handlers
  setupErrorHandlers(app);
};

export default bootstrap;
