import { catchAsync } from "@/utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";
import { OrderService } from "./order.service";
export class OrdersController {
  private providerService = new OrderService();

  getAllOrders = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.providerService.getOrder(req);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all orders",
        data: result.orders,
        meta: result.meta,
      });
    },
  );

  getSingleOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.getIdOrder(id as string);

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

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order deleted successfully",
        data: result,
      });
    },
  );
}
