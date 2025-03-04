import { User } from "../models/UserModel";
import { UserIF } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import { Op } from "sequelize";


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface AuthResponse {
  token: string;
  user: UserIF;
}

class UserServices {
  async register(userInfo: UserIF, imageFile?: string): Promise<AuthResponse> {
    const { password } = userInfo;
    const hashedPass = await bcrypt.hash(password, 10);


    const user = await User.create({ ...userInfo, password: hashedPass });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  async login(userInfo: { email: string; password: string }): Promise<AuthResponse> {
    const user = await User.findOne({
      where: { email: userInfo.email },
      attributes: ["id", "username", "email", "password", "role", "createdAt", "avatar"],
    });

    if (!user) throw new Error("Invalid Email");

    const isValidPass = await bcrypt.compare(userInfo.password, user.password);
    if (!isValidPass) throw new Error("Invalid password");

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  async checkUser(field: "email" | "username", value: string) {
    const user = await User.findOne({
      where: { [field]: value },
      attributes: ["id", "username", "email", "role", "createdAt", "avatar"],
    });
  
    return user ? true : false;
  }
  

  async updateUser(
    id: number,
    userData: { username?: string; email?: string },
    imageFile?: string
  ) {
    console.log(111)
    console.log(id)
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


    let imageUrl = null;
    if (imageFile) {
      const uploadedImage = await cloudinary.v2.uploader.upload(imageFile, {
        folder: "users",
      });
      imageUrl = uploadedImage.secure_url;
    }

    await user.update({...userData,avatar:imageUrl});

    return await User.findOne({
      where: { id },
      attributes: ["id", "username", "email", "role", "createdAt", "avatar"],
    });
  }
}

export const userService = new UserServices();
