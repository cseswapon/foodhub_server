import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { OrderService } from "./order.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cacheDeleteByPattern, cacheGet, cacheSet } from "../../lib/redis";

const ORDER_LIST_TTL = 120;
const ORDER_SINGLE_TTL = 120;

export class OrdersController {
  private providerService = new OrderService();

  getAllOrders = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `orders:list:${req.user.role}:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet<{
        orders: unknown[];
        meta: {
          total: number;
          total_page: number;
          current_page: number;
          limit: number;
          skip: number;
        };
      }>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve all orders",
          data: cached.orders,
          meta: cached.meta,
        });
      }

      const result = await this.providerService.getOrder(req);
      await cacheSet(
        cacheKey,
        { orders: result.orders, meta: result.meta },
        ORDER_LIST_TTL,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all orders",
        data: result.orders,
        meta: result.meta,
      });
    },
  );

  getAllOrdersMeal = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `orders:meal:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet<{ orders: unknown[] }>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve all orders",
          data: cached.orders,
        });
      }

      const result = await this.providerService.getOrderMeal(req);
      await cacheSet(cacheKey, { orders: result.orders }, ORDER_LIST_TTL);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all orders",
        data: result.orders,
      });
    },
  );

  getSingleOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const cacheKey = `orders:single:${id}:${req.user.role}:${req.user.id}`;
      const cached = await cacheGet<unknown>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve single meal",
          data: cached,
        });
      }

      const result = await this.providerService.getIdOrder(id as string);
      await cacheSet(cacheKey, result, ORDER_SINGLE_TTL);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single meal",
        data: result,
      });
    },
  );

  createOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.providerService.createOrder(req);
      await cacheDeleteByPattern("orders:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Order created successfully",
        data: result,
      });
    },
  );

  updateOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.providerService.updateOrder(
      id as string,
      req.body,
      req.user.role as "customer" | "provider" | "admin",
      req.user.id as string,
    );
    await cacheDeleteByPattern("orders:*");
    await cacheDeleteByPattern("dashboard:*");

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  });

  deleteOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.deleteOrder(id as string);
      await cacheDeleteByPattern("orders:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order deleted successfully",
        data: result,
      });
    },
  );
}
