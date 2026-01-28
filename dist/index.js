"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cors_1 = __importDefault(require("cors"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const routes_1 = __importDefault(require("./routes/routes"));
const authGuard_1 = require("./middleware/authGuard");
const user_service_1 = require("./module/user/user.service");
const sendResponse_1 = require("./utils/sendResponse");
const user_controller_1 = require("./module/user/user.controller");
const userService = new user_service_1.UserServices();
const userController = new user_controller_1.UserController();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
// user profile
app.patch("/api/users/profile", (0, authGuard_1.authGuard)(), userController.updateProfile.bind(userController));
app.use("/api/auth/me", (0, authGuard_1.authGuard)(), async (req, res) => {
    const user = await userService.getUserProfile(req.user.email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Profile",
        data: user,
    });
});
// auth route
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app.get("/", (req, res) => {
    res.status(http_status_codes_1.default.OK).send({
        success: true,
        message: "Hey Baby Programer !!! What's up ?",
        time: new Date().toISOString(),
    });
});
// all route
app.use(routes_1.default);
exports.default = app;
