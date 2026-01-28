import { db as Database } from "@/db";
import { Prisma } from "@/db/generated/client";
import { getPagination } from "@/utils/pagination";
import { Request } from "express";

export class ReviewService {
  private readonly db = Database;

  getReview = async (req: Request) => {
    const total = await this.db.review.count();
    const { page, limit, skip } = getPagination(req);
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

  getIdReview = async (id: string) => {
    const review = await this.db.review.findFirst({
      where: {
        id,
      },
    });
    return review;
  };

  createReview = async (data: Prisma.ReviewCreateInput) => {
    const result = await this.db.review.create({
      data,
    });
    return result;
  };

  updateReview = async (id: string, data: Prisma.ReviewUpdateInput) => {
    const reviews = await this.db.review.update({
      where: {
        id,
      },
      data,
    });
    return reviews;
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
