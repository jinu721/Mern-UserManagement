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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const AdminServices_1 = require("../services/AdminServices");
const httpStatus_1 = require("../constants/httpStatus");
class AdminController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('HHHHHH');
            try {
                const users = yield AdminServices_1.adminService.getAllUsers();
                res.status(httpStatus_1.HttpStatus.OK).json({ success: true, users });
            }
            catch (err) {
                res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AdminServices_1.adminService.deleteUser(parseInt(req.params.id));
                res.status(httpStatus_1.HttpStatus.OK).json({ success: true, message: "User Deleted" });
            }
            catch (err) {
                res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield AdminServices_1.adminService.addUser(req.body);
                res.status(httpStatus_1.HttpStatus.OK).json({ success: true, user: newUser });
            }
            catch (err) {
                console.log(err);
                res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                console.log(req.body);
                const updatedUser = yield AdminServices_1.adminService.updateUser(parseInt(req.params.id), req.body);
                res.status(httpStatus_1.HttpStatus.OK).json({ success: true, user: updatedUser });
            }
            catch (err) {
                console.log(err);
                res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
            }
        });
    }
}
exports.adminController = new AdminController();
