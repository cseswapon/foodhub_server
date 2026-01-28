"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const sendResponse_1 = require("@/utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = require("./user.service");
const catchAsync_1 = require("@/utils/catchAsync");
class UserController {
    userService = new user_service_1.UserServices();
    getUserProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const user = await this.userService.getUserProfile(req.user.email);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "My Profile",
            data: user,
        });
    });
    getUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { users, meta } = await this.userService.getUsers(req);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "All Users",
            data: users,
            meta: {
                current_page: meta.page,
                limit: meta.limit,
                total: meta.total,
                total_page: meta.total_page,
            },
        });
    });
    updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const body = req.body;
        const id = req.params.id;
        if (req.user.role?.includes("admin") && req.user.id === id) {
            return (0, sendResponse_1.sendResponse)(res, {
                success: true,
                statusCode: http_status_codes_1.default.OK,
                message: "Admin can't change won status",
                data: null,
            });
        }
        const updateUser = await this.userService.updateStatusRole(id, body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "User update successfully",
            data: updateUser,
        });
    });
    updateProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const userId = req.user.id;
        const body = req.body;
        if (!body.name && !body.phone && !body.address) {
            return (0, sendResponse_1.sendResponse)(res, {
                success: false,
                statusCode: http_status_codes_1.default.BAD_REQUEST,
                message: "Nothing to update",
            });
        }
        const updatedUser = await this.userService.updateProfile(userId, body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    });
}
exports.UserController = UserController;
