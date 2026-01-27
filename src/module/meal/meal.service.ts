import { db as Database } from "@/db";
import { Prisma } from "@/db/generated/client";
import { getPagination } from "@/utils/pagination";
import { Request } from "express";

export class MealService {
  private readonly db = Database;

  getMeal = async (req: Request) => {
    const total = await this.db.meal.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const meals = await this.db.meal.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        created_at: "asc",
      },
    });

    return {
      meals,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip,
      },
    };
  };

  getIdMeal = async (id: string) => {
    const meal = await this.db.meal.findFirst({
      where: {
        id,
      },
    });
    return meal;
  };

  createMeal = async (data: Prisma.MealCreateInput) => {
    const result = await this.db.meal.create({
      data,
    });
    return result;
  };

  updateMeal = async (id: string, data: Prisma.MealUpdateInput) => {
    const meals = await this.db.meal.update({
      where: {
        id,
      },
      data,
    });
    return meals;
  };

  deleteMeal = async (id: string) => {
    return this.db.$transaction(async (t) => {
      const meal = await t.meal.findUnique({
        where: { id },
      });

      if (!meal) {
        throw new Error("Meal not found");
      }

      await t.meal.delete({
        where: { id },
      });

      return { message: "Successfully deleted" };
    });
  };
}
