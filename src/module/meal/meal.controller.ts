import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { MealService } from "./meal.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
export class MealsController {
  private providerService = new MealService();

  getAllMeals = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.providerService.getMeal(req);

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
      const result = await this.providerService.getMealme(req);

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
      const result = await this.providerService.getIdMeal(id as string);

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
      const result = await this.providerService.getSingleMealProvider(
        id as string,
      );

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

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Meal deleted successfully",
        data: result,
      });
    },
  );
}
