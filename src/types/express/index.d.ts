import { IUser } from "../../database/models/index.models";

declare module "express-serve-static-core" {
  interface Request {
    currentUser?: IUser;
  }
}
