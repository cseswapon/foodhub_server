import { db as Database } from "../../db";
import { Prisma } from "../../db/generated/client";
import { Request } from "express";
import { getPagination } from "../../utils/pagination";

export class ReviewService {
  private readonly db = Database;

  getReview = async (req: Request) => {
    const userId = req.user.id as string;
    const role = req.user.role as string;

    const { page, limit, skip } = getPagination(req);

    let whereCondition: Prisma.ReviewWhereInput = {};

    if (role !== "admin") {
      whereCondition = {
        is_visible: true,
      };
    }

    if (role === "customer") {
      whereCondition.user_id = userId;
    }

    const total = await this.db.review.count({
      where: whereCondition,
    });

    const total_page = Math.ceil(total / limit);

    const reviews = await this.db.review.findMany({
      where: whereCondition,
      take: limit,
      skip,
      orderBy: {
        created_at: "asc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
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

  getIdReview = async (id: string, userId: string, role: string) => {
    const whereCondition: Prisma.ReviewWhereInput = {
      id,
    };

    if (role === "customer") {
      whereCondition.user_id = userId;
    }

    const review = await this.db.review.findFirst({
      where: whereCondition,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!review) {
      throw new Error("Review not found or access denied");
    }

    return review;
  };

  createReview = async (
    userId: string,
    mealId: string,
    rating: number,
    comment?: string,
  ) => {
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

  updateReview = async (
    reviewId: string,
    userId: string,
    role: string,
    data: Prisma.ReviewUpdateInput,
  ) => {
    const review = await this.db.review.findUnique({
      where: { id: reviewId },
    });

    if (role !== "admin") {
      delete data.is_visible;
    }

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

  deleteReview = async (id: string) => {
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
