import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cacheGet, cacheSet } from "../../lib/redis";

const DASHBOARD_TTL = 120;

export class DashboardController {
  private readonly dashboardService = new DashboardService();
  getStatic = catchAsync(async (req: Request, res: Response) => {
    const cacheKey = `dashboard:${req.user.role}:${req.user.id}:${req.originalUrl}`;
    const cached = await cacheGet<unknown>(cacheKey);

    if (cached) {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Retrieve ${req.user.role} Statistics`,
        data: cached,
      });
    }

    const result = await this.dashboardService.getStatic(req);
    await cacheSet(cacheKey, result, DASHBOARD_TTL);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Retrieve ${req.user.role} Statistics`,
      data: result,
    });
  });
}
