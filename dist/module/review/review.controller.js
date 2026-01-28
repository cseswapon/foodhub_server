var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { catchAsync } from "@/utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";
import { ReviewService } from "./review.service";
export class ReviewsController {
    constructor() {
        this.reviewService = new ReviewService();
        this.getAllReviews = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.reviewService.getReview(req);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve all reviews",
                data: result.reviews,
                meta: result.meta,
            });
        }));
        this.getSingleReview = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.reviewService.getIdReview(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve single review",
                data: result,
            });
        }));
        this.createReview = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { mealId, rating, comment, } = req.body;
            const result = yield this.reviewService.createReview(req.user.id, mealId, rating, comment);
            sendResponse(res, {
                statusCode: httpStatus.CREATED,
                success: true,
                message: "Review created successfully",
                data: result,
            });
        }));
        this.updateReview = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.reviewService.updateReview(id, req.user.id, req.user.role, req.body);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Review updated successfully",
                data: result,
            });
        }));
        this.deleteReview = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.reviewService.deleteReview(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Review deleted successfully",
                data: result,
            });
        }));
    }
}
