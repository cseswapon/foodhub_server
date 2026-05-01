import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ReviewService } from "./review.service";
import { UserRole } from "../..//db/generated/enums";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { cacheDeleteByPattern, cacheGet, cacheSet } from "../../lib/redis";

const REVIEW_LIST_TTL = 180;
const REVIEW_SINGLE_TTL = 180;

export class ReviewsController {
  private reviewService = new ReviewService();

  getAllReviews = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const cacheKey = `reviews:list:${req.user.role}:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet<{
        reviews: unknown[];
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
          message: "Retrieve all reviews",
          data: cached.reviews,
          meta: cached.meta,
        });
      }

      const result = await this.reviewService.getReview(req);
      await cacheSet(
        cacheKey,
        { reviews: result.reviews, meta: result.meta },
        REVIEW_LIST_TTL,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all reviews",
        data: result.reviews,
        meta: result.meta,
      });
    },
  );

  getSingleReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const cacheKey = `reviews:single:${id}:${req.user.role}:${req.user.id}`;
    const cached = await cacheGet<unknown>(cacheKey);

    if (cached) {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single review",
        data: cached,
      });
    }

    const result = await this.reviewService.getIdReview(
      id as string,
      req.user.id as string,
      req.user.role as string,
    );
    await cacheSet(cacheKey, result, REVIEW_SINGLE_TTL);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Retrieve single review",
      data: result,
    });
  });

  createReview = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        mealId,
        rating,
        comment,
      }: { mealId: string; rating: number; comment?: string } = req.body;
      const result = await this.reviewService.createReview(
        req.user.id as string,
        mealId,
        rating,
        comment,
      );
      await cacheDeleteByPattern("reviews:*");
      await cacheDeleteByPattern("meals:single:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Review created successfully",
        data: result,
      });
    },
  );

  updateReview = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.reviewService.updateReview(
        id as string,
        req.user.id as string,
        req.user.role as UserRole,
        req.body,
      );
      await cacheDeleteByPattern("reviews:*");
      await cacheDeleteByPattern("meals:single:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review updated successfully",
        data: result,
      });
    },
  );

  deleteReview = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.reviewService.deleteReview(id as string);
      await cacheDeleteByPattern("reviews:*");
      await cacheDeleteByPattern("meals:single:*");
      await cacheDeleteByPattern("dashboard:*");

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully",
        data: result,
      });
    },
  );
}
