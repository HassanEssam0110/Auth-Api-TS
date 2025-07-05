import { Response } from "express";
import { generateToken } from "./token.utils";
import { IUser } from "../database/models/index.models";

type Status = {
  code: number;
  message: string;
};

const sendResponse = <T>(res: Response, status: Status, data?: T): void => {
  res.status(status.code).json({
    status: "success",
    data,
  });
};

const sendResponseWithToken = (
  res: Response,
  user: IUser,
  status: Status
): void => {
  const userData = user.toObject();
  delete userData.password;

  // GENERATE TOKEN
  const token = generateToken({
    userId: userData._id,
    role: userData.role,
  });

  // SEND RESPONSE
  res.status(status.code).json({
    status: "success",
    data: {
      user: userData,
      token,
    },
  });
};

export { sendResponse, sendResponseWithToken };
