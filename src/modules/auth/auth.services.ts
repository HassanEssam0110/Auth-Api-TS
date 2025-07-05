import { User } from "../../database/models/user.model";
import { ILoginUser, IRegisterUser } from "../../types/index.types";
import { IUser } from "../../database/models/index.models";
import { AppError, HttpStatus, comparePassword } from "../../utils/index.utils";

class AuthService {
  async register(userData: IRegisterUser): Promise<IUser | null> {
    const isEmailExists = await User.findOne({ email: userData.email });
    if (isEmailExists) {
      throw new AppError(HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.message);
    }
    const user = await User.create(userData);
    return user;
  }

  async login(userData: ILoginUser): Promise<IUser> {
    const { email, password } = userData;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await comparePassword(password, user?.password))) {
      throw new AppError(
        HttpStatus.INVALID_CREDENTIALS.code,
        HttpStatus.INVALID_CREDENTIALS.message
      );
    }

    return user;
  }
}

export default AuthService;
