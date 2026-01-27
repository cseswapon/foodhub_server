import { catchAsync } from "@/utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";
import { ProviderService } from "./provider.service";

export class ProvidersController {
  private providerService = new ProviderService();

  getAllProviders = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.providerService.getProvider(req);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all providers",
        data: result.providers,
        meta: result.meta,
      });
    },
  );

  getSingleProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.getIdProvider(id as string);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single provider",
        data: result,
      });
    },
  );

  createProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.providerService.createProvider(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Provider created successfully",
        data: result,
      });
    },
  );

  updateProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.updateProvider(id as string, req.body);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Provider updated successfully",
        data: result,
      });
    },
  );

  deleteProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.deleteProvider(id as string);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Provider deleted successfully",
        data: result,
      });
    },
  );
}
