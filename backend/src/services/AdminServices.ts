import { User } from "../models/UserModel";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

class AdminServices {
  async getAllUsers() {
    return await User.findAll({ attributes: { exclude: ["password"] } });
  }

  async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }
  async addUser(userData: User) {
    console.log(userData);
    const { password } = userData;
    const hashedPass = await bcrypt.hash(password, 10);
    return await User.create({
      ...userData,
      password: hashedPass,
      attributes: { exclude: ["password"] },
    });
  }

  async updateUser(id: number, userData: Partial<User>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    if (userData.username) {
      const isUsernameExist = await User.findOne({
        where: { username: userData.username, id: { [Op.ne]: id } },
      });
      if (isUsernameExist) {
        throw new Error("Username already exists");
      }
    }

    if (userData.email) {
      const isEmailExist = await User.findOne({
        where: { email: userData.email, id: { [Op.ne]: id } },
      });
      if (isEmailExist) {
        throw new Error("Email already exists");
      }
    }
    await User.update(userData, { where: { id } });
    return await User.findByPk(id);
  }
}

export const adminService = new AdminServices();
