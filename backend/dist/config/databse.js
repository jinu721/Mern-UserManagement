"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new sequelize_1.Sequelize(process.env.DB_NAME || 'postgres', process.env.DB_USER || 'postgres', process.env.DB_PASS || 'postgres', {
                host: process.env.DB_HOST || 'localhost',
                dialect: 'postgres',
                logging: false
            });
        }
        return Database.instance;
    }
}
exports.default = Database.getInstance();
