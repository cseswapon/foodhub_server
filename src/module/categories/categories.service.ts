import { db as Database } from "../../db";
import  { Request } from "express";
import { getPagination } from "../../utils/pagination";
import { Prisma } from "../../db/generated/client";

export class CategoriesService {
  private readonly db = Database;

  getCategories = async (req: Request) => {
    const total = await this.db.categories.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const categories = await this.db.categories.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        created_at: "asc",
      },
    });

    return {
      categories,
      meta: {
        total,
        total_page,
        current_page:page,
        limit,
        skip,
      },
    };
  };

  getIdCategories = async (id: string) => {
    const categories = await this.db.categories.findFirst({
      where: {
        id,
      },
    });
    return categories;
  };

  createCategories = async (data: Prisma.CategoriesCreateInput) => {
    const result = await this.db.categories.create({
      data,
    });
    return result;
  };

  updateCategories = async (id: string, data: Prisma.CategoriesUpdateInput) => {
    const categories = await this.db.categories.update({
      where: {
        id,
      },
      data,
    });
    return categories;
  };

  deleteCategories = async (id: string) => {
    return this.db.$transaction(async (t) => {
      const categories = await t.categories.findFirst({
        where: {
          id,
        },
      });
      if (!categories) {
        return "Categories not found";
      }
      await t.categories.delete({
        where: {
          id,
        },
      });

      return { message: "Successfully deleted" };
    });
  };
}
