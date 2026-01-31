import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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
    const updateUser = await this.userService.updateStatusRole(id, body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User update successfully",
      data: updateUser,
    });
  });

  updateProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id as string; 
    const body: { name?: string; phone?: string; address?: string } = req.body;
  
    if (!body.name && !body.phone && !body.address) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Nothing to update",
      });
    }

    const updatedUser = await this.userService.updateProfile(userId, body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  });
}
