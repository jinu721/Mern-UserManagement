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
exports.userController = void 0;
const UserServices_1 = require("../services/UserServices");
const httpStatus_1 = require("../constrains/httpStatus");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, user } = yield UserServices_1.userService.register(req.body);
                res.status(httpStatus_1.HttpStatus.OK).json({ success: true, message: 'User Created SUccessfully', user, token });
            }
            catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
                }
                else {
                    res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'An Unexpected Error Occured' });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Req Body ${req.body}`);
                const { token, user } = yield UserServices_1.userService.login(req.body);
                res.status(httpStatus_1.HttpStatus.OK).json({ success: true, message: 'Login Completed Successfully', user, token });
            }
            catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    console.log(err.message);
                    res.status(500).json({ success: false, message: err.message });
                }
                else {
                    res.status(500).json({ success: false, message: 'An Unexpeted Error Occured' });
                }
            }
        });
    }
    checkUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { field, value } = req.body;
                const resData = yield UserServices_1.userService.checkUser(field, value);
                if (resData) {
                    res.status(400).json({ success: false, message: `${field} Already Exists` });
                }
                else {
                    res.status(200).json({ success: true, message: `${field} Available` });
                }
            }
            catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    res.status(500).json({ success: false, message: err.message });
                }
                else {
                    res.status(500).json({ success: false, message: 'An Unexpected Error Occurred' });
                }
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const {} = req.body;
                const resData = yield UserServices_1.userService.checkUser(field, value);
                if (resData) {
                    res.status(400).json({ success: false, message: `${field} Already Exists` });
                }
                else {
                    res.status(200).json({ success: true, message: `${field} Available` });
                }
            }
            catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    res.status(500).json({ success: false, message: err.message });
                }
                else {
                    res.status(500).json({ success: false, message: 'An Unexpected Error Occurred' });
                }
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let imageFile;
                if (req.file) {
                    imageFile = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
                }
                const updatedUser = yield UserServices_1.userService.updateUser(Number(id), req.body, imageFile);
                res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
            }
            catch (err) {
                console.error('error', err);
                res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' });
            }
        });
    }
}
exports.userController = new UserController();
