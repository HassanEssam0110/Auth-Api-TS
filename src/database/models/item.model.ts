import { Document, Schema, model, models, Types, Model } from "mongoose";

export interface IItem extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  quantity: number;
  slug: string;
  addedBy: Types.ObjectId;
}

const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      minlength: [3, "Item name must be at least 3 characters long"],
      maxlength: [100, "Item name must be at most 100 characters long"],
    },
    description: {
      type: String,
      required: [true, "Item description is required"],
      minlength: [5, "Item description must be at least 3 characters long"],
      maxlength: [200, "Item description must be at most 200 characters long"],
    },
    quantity: {
      type: Number,
      required: [true, "Item quantity is required"],
      min: [1, "Item quantity must be at least 1"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Item: Model<IItem> =
  models.Item || model<IItem>("Item", itemSchema);
