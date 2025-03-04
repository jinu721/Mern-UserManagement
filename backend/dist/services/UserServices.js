"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const sequelize_1 = require("sequelize");
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class UserServices {
    register(userInfo, imageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = userInfo;
            const hashedPass = yield bcrypt_1.default.hash(password, 10);
            const user = yield UserModel_1.User.create(Object.assign(Object.assign({}, userInfo), { password: hashedPass }));
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { token, user };
        });
    }
    login(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.User.findOne({
                where: { email: userInfo.email },
                attributes: ["id", "username", "email", "password", "role", "createdAt", "avatar"],
            });
            if (!user)
                throw new Error("Invalid Email");
            const isValidPass = yield bcrypt_1.default.compare(userInfo.password, user.password);
            if (!isValidPass)
                throw new Error("Invalid password");
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                avatar: user.avatar,
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { token, user };
        });
    }
    checkUser(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.User.findOne({
                where: { [field]: value },
                attributes: ["id", "username", "email", "role", "createdAt", "avatar"],
            });
            return user ? true : false;
        });
    }
    updateUser(id, userData, imageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(111);
            console.log(id);
            const user = yield UserModel_1.User.findByPk(id);
            if (!user)
                throw new Error("User not found");
            if (userData.username) {
                const isUsernameExist = yield UserModel_1.User.findOne({
                    where: { username: userData.username, id: { [sequelize_1.Op.ne]: id } },
                });
                if (isUsernameExist) {
                    throw new Error("Username already exists");
                }
            }
            if (userData.email) {
                const isEmailExist = yield UserModel_1.User.findOne({
                    where: { email: userData.email, id: { [sequelize_1.Op.ne]: id } },
                });
                if (isEmailExist) {
                    throw new Error("Email already exists");
                }
            }
            let imageUrl = null;
            if (imageFile) {
                const uploadedImage = yield cloudinary_1.default.v2.uploader.upload(imageFile, {
                    folder: "users",
                });
                imageUrl = uploadedImage.secure_url;
            }
            yield user.update(Object.assign(Object.assign({}, userData), { avatar: imageUrl }));
            return yield UserModel_1.User.findOne({
                where: { id },
                attributes: ["id", "username", "email", "role", "createdAt", "avatar"],
            });
        });
    }
}
exports.userService = new UserServices();
