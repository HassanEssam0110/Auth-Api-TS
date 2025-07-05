import { Types } from "mongoose";
import { User, IUser } from "../../database/models/index.models";
import { IChangeMePassword, IUpdateMe } from "../../types/index.types";
import { AppError, comparePassword, HttpStatus } from "../../utils/index.utils";

class UserService {
  async updateMe(
    id: Types.ObjectId,
    userData: IUpdateMe
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  async changeMePassword(
    id: Types.ObjectId,
    userData: IChangeMePassword
  ): Promise<IUser> {
    const { current_password, password } = userData;

    const user = await User.findById(id).select("+password");
    if (!user)
      throw new AppError(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.message
      );

    const isPasswordCorrect = await comparePassword(
      current_password,
      user.password
    );
    if (!isPasswordCorrect)
      throw new AppError(
        HttpStatus.INVALID_CREDENTIALS.code,
        HttpStatus.INVALID_CREDENTIALS.message
      );

    user.password = password;
    user.passwordChangedAt = new Date();
    return await user.save();
  }

  async deleteMe(id: Types.ObjectId): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { isDeleted: true });
  }
}

export default UserService;
