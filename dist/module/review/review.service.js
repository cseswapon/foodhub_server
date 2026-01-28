"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const db_1 = require("@/db");
const pagination_1 = require("@/utils/pagination");
class ReviewService {
    db = db_1.db;
    getReview = async (req) => {
        const total = await this.db.review.count();
        const { page, limit, skip } = (0, pagination_1.getPagination)(req);
        const total_page = Math.ceil(total / limit);
        const reviews = await this.db.review.findMany({
            where: {
                is_visible: true,
            },
            take: limit,
            skip: skip,
            orderBy: {
                created_at: "asc",
            },
        });
        return {
            reviews,
            meta: {
                total,
                total_page,
                current_page: page,
                limit,
                skip,
            },
        };
    };
    getIdReview = async (id) => {
        const review = await this.db.review.findFirst({
            where: {
                id,
            },
        });
        return review;
    };
    createReview = async (userId, mealId, rating, comment) => {
        const orderItem = await this.db.order_Item.findFirst({
            where: {
                meal_id: mealId,
                order: {
                    user_id: userId,
                    status: "delivered",
                },
            },
        });
        if (!orderItem) {
            throw new Error("You can review only after ordering this meal");
        }
        const alreadyReviewed = await this.db.review.findFirst({
            where: {
                user_id: userId,
                meal_id: mealId,
            },
        });
        if (alreadyReviewed) {
            throw new Error("You have already reviewed this meal");
        }
        return this.db.review.create({
            data: {
                user: { connect: { id: userId } },
                meal: { connect: { id: mealId } },
                rating,
                comment: comment ?? null,
                is_visible: true,
            },
        });
    };
    updateReview = async (reviewId, userId, role, data) => {
        const review = await this.db.review.findUnique({
            where: { id: reviewId },
        });
        if (!review) {
            throw new Error("Review not found");
        }
        if (role === "customer" && review.user_id !== userId) {
            throw new Error("You are not allowed to update this review");
        }
        return this.db.review.update({
            where: { id: reviewId },
            data,
        });
    };
    deleteReview = async (id) => {
        return this.db.$transaction(async (t) => {
            const review = await t.review.findUnique({
                where: { id },
            });
            if (!review) {
                throw new Error("Review not found");
            }
            await t.review.delete({
                where: { id },
            });
            return { message: "Successfully deleted" };
        });
    };
}
exports.ReviewService = ReviewService;
