import { catchAsync } from "@/utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";
import { ReviewService } from "./review.service";
export class ReviewsController {
  private reviewService = new ReviewService();

  getAllReviews = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.reviewService.getReview(req);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve all reviews",
        data: result.reviews,
        meta: result.meta,
      });
    },
  );

  getSingleReview = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const result = await this.reviewService.getIdReview(id as string);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrieve single review",
        data: result,
      });
    },
  );

  createReview = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.reviewService.createReview(req.body);

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
      const result = await this.reviewService.updateReview(id as string, req.body);

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

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully",
        data: result,
      });
    },
  );
}
