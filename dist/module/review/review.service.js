var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db as Database } from "@/db";
import { getPagination } from "@/utils/pagination";
export class ReviewService {
    constructor() {
        this.db = Database;
        this.getReview = (req) => __awaiter(this, void 0, void 0, function* () {
            const total = yield this.db.review.count();
            const { page, limit, skip } = getPagination(req);
            const total_page = Math.ceil(total / limit);
            const reviews = yield this.db.review.findMany({
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
        });
        this.getIdReview = (id) => __awaiter(this, void 0, void 0, function* () {
            const review = yield this.db.review.findFirst({
                where: {
                    id,
                },
            });
            return review;
        });
        this.createReview = (userId, mealId, rating, comment) => __awaiter(this, void 0, void 0, function* () {
            const orderItem = yield this.db.order_Item.findFirst({
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
            const alreadyReviewed = yield this.db.review.findFirst({
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
                    comment: comment !== null && comment !== void 0 ? comment : null,
                    is_visible: true,
                },
            });
        });
        this.updateReview = (reviewId, userId, role, data) => __awaiter(this, void 0, void 0, function* () {
            const review = yield this.db.review.findUnique({
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
        });
        this.deleteReview = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.db.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const review = yield t.review.findUnique({
                    where: { id },
                });
                if (!review) {
                    throw new Error("Review not found");
                }
                yield t.review.delete({
                    where: { id },
                });
                return { message: "Successfully deleted" };
            }));
        });
    }
}
