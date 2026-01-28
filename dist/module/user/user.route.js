"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authGuard_1 = require("./../../middleware/authGuard");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userController = new user_controller_1.UserController();
const router = express_1.default.Router();
router.get("/users", (0, authGuard_1.authGuard)("admin"), userController.getUsers.bind(userController));
router.patch("/users/:id", (0, authGuard_1.authGuard)("admin"), userController.updateUser.bind(userController));
exports.default = router;
