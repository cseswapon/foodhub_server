"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const catchAsync_1 = require("@/utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("@/utils/sendResponse");
const review_service_1 = require("./review.service");
class ReviewsController {
    reviewService = new review_service_1.ReviewService();
    getAllReviews = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.reviewService.getReview(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve all reviews",
            data: result.reviews,
            meta: result.meta,
        });
    });
    getSingleReview = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.reviewService.getIdReview(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve single review",
            data: result,
        });
    });
    createReview = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { mealId, rating, comment, } = req.body;
        const result = await this.reviewService.createReview(req.user.id, mealId, rating, comment);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Review created successfully",
            data: result,
        });
    });
    updateReview = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.reviewService.updateReview(id, req.user.id, req.user.role, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Review updated successfully",
            data: result,
        });
    });
    deleteReview = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.reviewService.deleteReview(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Review deleted successfully",
            data: result,
        });
    });
}
exports.ReviewsController = ReviewsController;
