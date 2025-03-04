"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatus_1 = require("../constants/httpStatus");
const authenticateJWT = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'Token Not Provided' });
        return;
    }
    const token = authHeader.split(" ")[1].replace(/"/g, "");
    console.log(token);
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error) {
            res.status(httpStatus_1.HttpStatus.FORBIDDEN).json({ message: err.message });
        }
        else {
            res.status(httpStatus_1.HttpStatus.FORBIDDEN).json({ message: 'Invalid or Expired the token' });
        }
        return;
    }
    ;
};
exports.authenticateJWT = authenticateJWT;
