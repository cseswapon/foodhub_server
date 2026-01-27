import { catchAsync } from "@/utils/catchAsync";
import { CategoriesService } from "./categories.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";

export class CategoriesController {
  private categoriesService = new CategoriesService();

  getAllCategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.categoriesService.getCategories(req);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all categories",
        data: result.categories,
        meta: result.meta,
      });
    },
  );

  getSingleCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.categoriesService.getIdCategories(id as string);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single category",
        data: result,
      });
    },
  );

  createCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.categoriesService.createCategories(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Category created successfully",
        data: result,
      });
    },
  );

  updateCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.categoriesService.updateCategories(
        id as string,
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category updated successfully",
        data: result,
      });
    },
  );

  deleteCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.categoriesService.deleteCategories(
        id as string,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category deleted successfully",
        data: result,
      });
    },
  );
}
