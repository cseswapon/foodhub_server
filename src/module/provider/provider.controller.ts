import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ProviderService } from "./provider.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cacheDeleteByPattern, cacheGet, cacheSet } from "../../lib/redis";

const PROVIDER_LIST_TTL = 180;
const PROVIDER_SINGLE_TTL = 180;

export class ProvidersController {
  private providerService = new ProviderService();

  getAllProviders = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `providers:list:${req.originalUrl}`;
      const cached = await cacheGet<{
        providers: unknown[];
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
          message: "Retrieve all providers",
          data: cached.providers,
          meta: cached.meta,
        });
      }

      const result = await this.providerService.getProvider(req);
      await cacheSet(
        cacheKey,
        { providers: result.providers, meta: result.meta },
        PROVIDER_LIST_TTL,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all providers",
        data: result.providers,
        meta: result.meta,
      });
    },
  );
  /* getAllProvidersMeal = catchAsync(
    async (req: Request,res: Response,next: NextFunction) => {
      const id = req.params.id as string;
      const result = await this.providerService.getProviderMeal(req,id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all providers meal",
        data: result.providers
      });
    },
  ); */
  getAllProvidersme = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `providers:me:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet<{
        providers: unknown[];
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
          message: "Retrieve my all providers",
          data: cached.providers,
          meta: cached.meta,
        });
      }

      const result = await this.providerService.getProviderme(req);
      await cacheSet(
        cacheKey,
        { providers: result.providers, meta: result.meta },
        PROVIDER_LIST_TTL,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve my all providers",
        data: result.providers,
        meta: result.meta,
      });
    },
  );

  getSingleProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `providers:single:${req.params.id}`;
      const cached = await cacheGet<unknown>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve single provider",
          data: cached,
        });
      }

      const result = await this.providerService.getIdProvider(
        req.params.id as string,
      );
      await cacheSet(cacheKey, result, PROVIDER_SINGLE_TTL);

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
      const userId = req.user.id as string;
      const result = await this.providerService.createProvider(
        req.body,
        userId,
      );
      await cacheDeleteByPattern("providers:*");
      await cacheDeleteByPattern("dashboard:*");

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
      const result = await this.providerService.updateProvider(
        req.user.id as string,
        req.body,
        req.query.name as string,
      );
      await cacheDeleteByPattern("providers:*");
      await cacheDeleteByPattern("dashboard:*");

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
      await cacheDeleteByPattern("providers:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Provider deleted successfully",
        data: result,
      });
    },
  );
}
