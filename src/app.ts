import express, { Express } from "express";
import morgan from "morgan";
import CONFIG from "./config/config";
import bootstrap from "./bootsrap";

const app: Express = express();

/* ------------------ Middleware Setup ------------------ */

if (CONFIG.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());


/* ------------------ Mount Routes and Error Handlers ------------------ */
bootstrap(app);

export default app;
