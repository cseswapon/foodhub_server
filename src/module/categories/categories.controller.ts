import { CategoriesService } from "./categories.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cacheDeleteByPattern, cacheGet, cacheSet } from "../../lib/redis";

const CATEGORIES_LIST_TTL = 300;
const CATEGORIES_SINGLE_TTL = 300;

export class CategoriesController {
  private categoriesService = new CategoriesService();

  getAllCategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `categories:list:${req.originalUrl}`;
      const cached = await cacheGet<{
        categories: unknown[];
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
          message: "Retrieve all categories",
          data: cached.categories,
          meta: cached.meta,
        });
      }

      const result = await this.categoriesService.getCategories(req);
      await cacheSet(
        cacheKey,
        { categories: result.categories, meta: result.meta },
        CATEGORIES_LIST_TTL,
      );

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
      const cacheKey = `categories:single:${id}`;
      const cached = await cacheGet<unknown>(cacheKey);

      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve single category",
          data: cached,
        });
      }

      const result = await this.categoriesService.getIdCategories(id as string);
      await cacheSet(cacheKey, result, CATEGORIES_SINGLE_TTL);

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
      await cacheDeleteByPattern("categories:*");
      await cacheDeleteByPattern("dashboard:*");

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
      await cacheDeleteByPattern("categories:*");
      await cacheDeleteByPattern("dashboard:*");

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
      await cacheDeleteByPattern("categories:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category deleted successfully",
        data: result,
      });
    },
  );
}
