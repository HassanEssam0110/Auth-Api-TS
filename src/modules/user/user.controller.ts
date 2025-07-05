import { Request, Response, NextFunction } from "express";
import { asynchandler } from "../../middlewares/index.middlewares";
import UserService from "./user.services";
import {
  AppError,
  HttpStatus,
  sendResponse,
  sendResponseWithToken,
} from "../../utils/index.utils";

const userService = new UserService();

/**
 * @description Get the authenticated user's profile information.
 * @route GET /api/v1/users/me
 * @access Private
 * @allowedRoles user, admin
 */
const getMe = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { UNAUTHORIZED, OK } = HttpStatus;

    if (!req.currentUser)
      return next(new AppError(UNAUTHORIZED.code, UNAUTHORIZED.message));

    sendResponse(res, OK, req.currentUser);
  }
);

/**
 * @description Update authenticated user data (name, email).
 * @route PATCH /api/v1/users/me
 * @access Private
 * @allowedRoles user, admin
 */
const updateMe = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { OK, NOT_FOUND } = HttpStatus;
    const user = await userService.updateMe(req.currentUser!._id, req.body);
    if (!user) {
      return next(new AppError(NOT_FOUND.code, `User ${NOT_FOUND.message}`));
    }

    sendResponse(res, OK, user);
  }
);

/**
 * @description Change authenticated user Password.
 * @route PATCH /api/v1/users/me/password
 * @access Private
 * @allowedRoles user, admin
 */
const changeMePassword = asynchandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await userService.changeMePassword(
      req.currentUser!._id,
      req.body
    );

    sendResponseWithToken(res, user, HttpStatus.OK);
  }
);

/**
 * @description Soft Delete authenticated user.
 * @route Delete /api/v1/users/me/
 * @access Private
 * @allowedRoles user
 */
const deleteMe = asynchandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await userService.deleteMe(req.currentUser!._id);
    sendResponse(res, HttpStatus.DELETED);
  }
);

export { getMe, updateMe, changeMePassword, deleteMe };
