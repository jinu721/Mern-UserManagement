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
exports.adminService = void 0;
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
class AdminServices {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.User.findAll({ attributes: { exclude: ["password"] } });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.User.destroy({ where: { id } });
        });
    }
    addUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userData);
            const { password } = userData;
            const hashedPass = yield bcrypt_1.default.hash(password, 10);
            return yield UserModel_1.User.create(Object.assign(Object.assign({}, userData), { password: hashedPass, attributes: { exclude: ["password"] } }));
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield UserModel_1.User.update(userData, { where: { id } });
            return yield UserModel_1.User.findByPk(id);
        });
    }
}
exports.adminService = new AdminServices();
