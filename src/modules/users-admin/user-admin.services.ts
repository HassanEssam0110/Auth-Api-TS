import { User, IUser } from "../../database/models/index.models";

class UserAdminService {
  async getUsers(): Promise<IUser[]> {
    return await User.find({});
  }

  async getUser(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async createUser(userData: IUser): Promise<IUser> {
    return await User.create(userData);
  }

  async updateUser(
    id: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    const { name, email, role, password, slug } = userData;
    const user = await User.findById(id);
    if (!user) return null;

    if (name && slug) {
      user.name = name;
      user.slug = slug;
    }
    if (password) {
      user.password = password;
      user.passwordChangedAt = new Date();
    }
    if (email) user.email = email;
    if (role) user.role = role;

    return await user.save();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default UserAdminService;
