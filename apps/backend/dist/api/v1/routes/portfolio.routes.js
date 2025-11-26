"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = require("src/middlewares/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const portfolioRouter = (0, express_1.Router)();
// Configure multer for memory storage
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// All portfolio routes require ADMIN role
portfolioRouter.use(auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)('ADMIN'));
portfolioRouter.post('/', upload.single('image'), portfolio_controller_1.PortfolioController.create);
portfolioRouter.get('/', portfolio_controller_1.PortfolioController.getAll);
portfolioRouter.delete('/:id', portfolio_controller_1.PortfolioController.delete);
exports.default = portfolioRouter;
