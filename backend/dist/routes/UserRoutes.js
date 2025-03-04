"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControler_1 = require("../controllers/UserControler");
const multerConfig_1 = require("../utils/multerConfig");
const route = (0, express_1.Router)();
route.post('/register', UserControler_1.userController.register);
route.post('/login', UserControler_1.userController.login);
route.post('/check-user', UserControler_1.userController.checkUser);
route.post('/check-user', UserControler_1.userController.checkUser);
route.post('/update/profile/:id', multerConfig_1.upload.single('avatar'), UserControler_1.userController.updateUser);
exports.default = route;
