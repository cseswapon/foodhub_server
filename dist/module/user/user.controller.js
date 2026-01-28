var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendResponse } from "@/utils/sendResponse";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "@/utils/catchAsync";
export class UserController {
    constructor() {
        this.userService = new UserServices();
        this.getUserProfile = catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserProfile(req.user.email);
            sendResponse(res, {
                success: true,
                statusCode: httpStatus.OK,
                message: "My Profile",
                data: user,
            });
        }));
        this.getUsers = catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { users, meta } = yield this.userService.getUsers(req);
            sendResponse(res, {
                success: true,
                statusCode: httpStatus.OK,
                message: "All Users",
                data: users,
                meta: {
                    current_page: meta.page,
                    limit: meta.limit,
                    total: meta.total,
                    total_page: meta.total_page,
                },
            });
        }));
        this.updateUser = catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            const id = req.params.id;
            if (((_a = req.user.role) === null || _a === void 0 ? void 0 : _a.includes("admin")) && req.user.id === id) {
                return sendResponse(res, {
                    success: true,
                    statusCode: httpStatus.OK,
                    message: "Admin can't change won status",
                    data: null,
                });
            }
            const updateUser = yield this.userService.updateStatusRole(id, body);
            sendResponse(res, {
                success: true,
                statusCode: httpStatus.OK,
                message: "User update successfully",
                data: updateUser,
            });
        }));
        this.updateProfile = catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const body = req.body;
            if (!body.name && !body.phone && !body.address) {
                return sendResponse(res, {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: "Nothing to update",
                });
            }
            const updatedUser = yield this.userService.updateProfile(userId, body);
            sendResponse(res, {
                success: true,
                statusCode: httpStatus.OK,
                message: "Profile updated successfully",
                data: updatedUser,
            });
        }));
    }
}
