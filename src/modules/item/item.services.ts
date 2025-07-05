import { Item, IItem } from "../../database/models/index.models";

import { CreateItem, UpdateItem } from "../../types/index.types";

class ItemService {
  async getAll(): Promise<IItem[] | []> {
    return await Item.find().populate({
      path: "addedBy",
      select: "name email",
    });
  }

  async getOne(id: string): Promise<IItem | null> {
    return await Item.findById(id).populate({
      path: "addedBy",
      select: "name email",
    });
  }

  async create(itemData: CreateItem): Promise<IItem | null> {
    return await Item.create(itemData);
  }

  async update(id: string, itemData: UpdateItem): Promise<IItem | null> {
    console.log(itemData);

    const item = await Item.findByIdAndUpdate(id, itemData, {
      new: true,
    });
    return item;
  }

  async delete(id: string): Promise<IItem | null> {
    return await Item.findByIdAndDelete(id);
  }
}

export default ItemService;
