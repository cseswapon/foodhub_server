import { sendResponse } from "@/utils/sendResponse";
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "@/utils/catchAsync";

export class UserController {
  private readonly userService = new UserServices();

  getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const user = await this.userService.getUserProfile(
      req.user.email as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Profile",
      data: user,
    });
  });

  getUsers = catchAsync(async (req: Request, res: Response) => {
    const { users, meta } = await this.userService.getUsers(req);
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
  });

  updateUser = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const id = req.params.id as string;
    if (req.user.role?.includes("admin") && req.user.id === id) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Admin can't change won status",
        data: null,
      });
    }
    const { status } = body || {};
    const updateUser = await this.userService.updateStatus(id, status);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User update successfully",
      data: updateUser,
    });
  });
}
