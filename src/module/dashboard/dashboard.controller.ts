import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";
import { sendResponse } from "@/utils/sendResponse";
import httpStatus from 'http-status-codes'

export class DashboardController {
    private readonly dashboardService = new DashboardService();
  getStatic = catchAsync(async (req: Request, res: Response) => {
    const result = await this.dashboardService.getStatic(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Retrieve ${req.user.role} Statistics`,
      data: result,
    });
  });
}
