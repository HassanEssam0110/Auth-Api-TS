import { Request, Response, NextFunction } from "express";
import { asynchandler } from "../../middlewares/index.middlewares";
import {
  AppError,
  HttpStatus,
  sendResponseWithToken,
} from "../../utils/index.utils";
import AuthService from "./auth.services";

const authService = new AuthService();
const { OK, CREATED, SERVER_ERROR } = HttpStatus;

/**
 * @desc    Registers a new user
 * @method  POST
 * @route  /api/v1/auth/register
 * @access  Public
 */
const register = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.register(req.body);
    if (user) {
      sendResponseWithToken(res, user, CREATED);
    } else {
      next(new AppError(SERVER_ERROR.code, SERVER_ERROR.message));
    }
  }
);

/**
 * @desc    Login user
 * @method  POST
 * @route  /api/v1/auth/login
 * @access  Public
 */
const login = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.login(req.body);
   
    if (!user) {
      return next(new AppError(SERVER_ERROR.code, SERVER_ERROR.message));
    }

    sendResponseWithToken(res, user, OK);
  }
);

export { register, login };
