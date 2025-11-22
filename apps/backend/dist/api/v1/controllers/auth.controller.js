"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = async (req, res, next) => {
    try {
        const user = await auth_service_1.authService.register(req.body);
        res.status(201).json({
            status: 'success',
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.login(req.body);
        res.status(200).json({
            status: 'sucess',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
