import { db as Database } from "@/db";
import { DietaryType, Prisma } from "@/db/generated/client";
import { MealWhereInput } from "@/db/generated/models";
import { getPagination } from "@/utils/pagination";
import { Request } from "express";

export class MealService {
  private readonly db = Database;

  getMeal = async (req: Request) => {
    const search = req.query.search as string;
    const maxPrice = req.query.maxPrice as string;
    const minPrice = req.query.minPrice as string;
    const type = req.query.type as string;

    const filterWhere: Array<MealWhereInput> = [];

    if (search) {
      filterWhere.push({
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    if (minPrice || maxPrice) {
      filterWhere.push({
        price: {
          ...(minPrice && { gte: Number(minPrice) }),
          ...(maxPrice && { lte: Number(maxPrice) }),
        },
      });
    }

    if (type) {
      filterWhere.push({
        dietary_type: {
          in: type.split(",") as DietaryType[],
        },
      });
    }

    const total = await this.db.meal.count({
      where: {
        AND: filterWhere,
      },
    });

    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const meals = await this.db.meal.findMany({
      where: {
        AND: filterWhere,
      },
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
