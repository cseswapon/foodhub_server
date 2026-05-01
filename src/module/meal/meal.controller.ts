import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { MealService } from "./meal.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cacheDeleteByPattern, cacheGet, cacheSet } from "../../lib/redis";

const MEAL_LIST_TTL = 180;
const MEAL_SINGLE_TTL = 180;

export class MealsController {
  private providerService = new MealService();

  getAllMeals = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `meals:list:${req.originalUrl}`;
      const cached = await cacheGet<{
        meals: unknown[];
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
          message: "Retrieve all meals",
          data: cached.meals,
          meta: cached.meta,
        });
      }

      const result = await this.providerService.getMeal(req);
      await cacheSet(
        cacheKey,
        { meals: result.meals, meta: result.meta },
        MEAL_LIST_TTL,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all meals",
        data: result.meals,
        meta: result.meta,
      });
    },
  );
  getAllMealsme = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `meals:me:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet<{
        meals: unknown[];
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
          message: "Retrieve all meals",
          data: cached.meals,
          meta: cached.meta,
        });
      }

      const result = await this.providerService.getMealme(req);
      await cacheSet(
        cacheKey,
        { meals: result.meals, meta: result.meta },
        MEAL_LIST_TTL,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all meals",
        data: result.meals,
        meta: result.meta,
      });
    },
  );

  getSingleMeal = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const cacheKey = `meals:single:public:${id}`;
      const cached = await cacheGet<unknown>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve single meal",
          data: cached,
        });
      }

      const result = await this.providerService.getIdMeal(id as string);
      await cacheSet(cacheKey, result, MEAL_SINGLE_TTL);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single meal",
        data: result,
      });
    },
  );
  getSingleMealProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const cacheKey = `meals:single:provider:${id}`;
      const cached = await cacheGet<unknown>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve single meal",
          data: cached,
        });
      }

      const result = await this.providerService.getSingleMealProvider(
        id as string,
      );
      await cacheSet(cacheKey, result, MEAL_SINGLE_TTL);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single meal",
        data: result,
      });
    },
  );

  createMeal = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.providerService.createMeal(req.body);
      await cacheDeleteByPattern("meals:*");
      await cacheDeleteByPattern("providers:single:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Meal created successfully",
        data: result,
      });
    },
  );

  updateMeal = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.updateMeal(
        id as string,
        req.body,
      );
      await cacheDeleteByPattern("meals:*");
      await cacheDeleteByPattern("providers:single:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Meal updated successfully",
        data: result,
      });
    },
  );

  deleteMeal = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.providerService.deleteMeal(id as string);
      await cacheDeleteByPattern("meals:*");
      await cacheDeleteByPattern("providers:single:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Meal deleted successfully",
        data: result,
      });
    },
  );
}
