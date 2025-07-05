import { Request, Response, NextFunction } from "express";
import ItemService from "./item.services";
import { asynchandler } from "../../middlewares/index.middlewares";
import { AppError, HttpStatus, sendResponse } from "../../utils/index.utils";

const itemService = new ItemService();
const { OK, CREATED, DELETED, NOT_FOUND } = HttpStatus;
/**
 * @desc  retrieves all items
 * @method  GET
 * @route  /api/v1/items
 * @access  Public
 */
const getItems = asynchandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const items = await itemService.getAll();

    // SEND RESPONSE
    sendResponse(res, OK, items);
  }
);

/**
 * @desc  retrieves specific item by id
 * @method  GET
 * @route  /api/v1/items/:id
 * @access  Public
 */
const getItem = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await itemService.getOne(id);

    if (!item) return next(new AppError(NOT_FOUND.code, NOT_FOUND.message));

    // SEND RESPONSE
    sendResponse(res, OK, item);
  }
);

/**
 * @desc   Creates a new item
 * @method  POST
 * @route  /api/v1/items
 * @access  Public
 */
const createItem = asynchandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    req.body.addedBy = req.currentUser?._id;
    const item = await itemService.create(req.body);

    // SEND RESPONSE
    sendResponse(res, CREATED, item);
  }
);

/**
 * @desc   Update specific item by id
 * @method  PUT
 * @route  /api/v1/items/:id
 * @access  Public
 */
const updateItem = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await itemService.update(id, req.body);
    if (!item) return next(new AppError(NOT_FOUND.code, NOT_FOUND.message));

    // SEND RESPONSE
    sendResponse(res, OK, item);
  }
);

/**
 * @desc   Delete specific item by id
 * @method  DELETE
 * @route  /api/v1/items/:id
 * @access  Public
 */
const deleteItem = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await itemService.delete(id);
    if (!item) return next(new AppError(NOT_FOUND.code, NOT_FOUND.message));

    // SEND RESPONSE
    sendResponse(res, DELETED);
  }
);

export { getItems, getItem, createItem, updateItem, deleteItem };
