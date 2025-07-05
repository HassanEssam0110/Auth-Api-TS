import { Document, Model, model, models, Schema, Types, Query } from "mongoose";
import { SYSTEM_ROLES, hashPassword } from "../../utils/index.utils";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  passwordResetCode?: String;
  passwordResetExpires?: Date;
  passwordResetVerified?: Boolean;
  role: string;
  slug: string;
  isDeleted?: boolean;
  passwordChangedAfter(date: number): boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minLength: [6, "Name must be at least 6 characters long"],
      maxLength: [30, "Name must be at most 20 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: [true, "email is alerdy exists."],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters long"],
      maxLength: [100, "Password must be at most 100 characters long"],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    slug: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(SYSTEM_ROLES),
        message: "{VALUE} is not supported",
      },
      default: SYSTEM_ROLES.USER,
    },
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.passwordChangedAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.pre("save", async function (next) {
  // HASH PASSWORD
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

userSchema.pre(/^find/, function (this: Query<any, IUser>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const User: Model<IUser> =
  models.User || model<IUser>("User", userSchema);
