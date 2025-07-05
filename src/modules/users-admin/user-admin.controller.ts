import { Request, Response, NextFunction } from "express";
import { asynchandler } from "../../middlewares/index.middlewares";
import { AppError, HttpStatus, sendResponse } from "../../utils/index.utils";
import UserAdminService from "./user-admin.services";

const userAdminService = new UserAdminService();

const getUsers = asynchandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const users = await userAdminService.getUsers();
    sendResponse(res, HttpStatus.OK, users);
  }
);

const getUser = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userAdminService.getUser(req.params.id);
    if (!user) {
      return next(
        new AppError(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.message)
      );
    }
    sendResponse(res, HttpStatus.OK, user);
  }
);

const createUser = asynchandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await userAdminService.createUser(req.body);
    sendResponse(res, HttpStatus.CREATED, user);
  }
);

const updateUser = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userAdminService.updateUser(req.params.id, req.body);
    if (!user) {
      return next(
        new AppError(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.message)
      );
    }

    sendResponse(res, HttpStatus.OK, user);
  }
);

const deleteUser = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userAdminService.deleteUser(req.params.id);
    if (!user) {
      return next(
        new AppError(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.message)
      );
    }

    sendResponse(res, HttpStatus.DELETED);
  }
);

export { getUsers, getUser, createUser, updateUser, deleteUser };
