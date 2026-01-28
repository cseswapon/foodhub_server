"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = void 0;
const db_1 = require("@/db");
const pagination_1 = require("@/utils/pagination");
class MealService {
    db = db_1.db;
    getMeal = async (req) => {
        const search = req.query.search;
        const maxPrice = req.query.maxPrice;
        const minPrice = req.query.minPrice;
        const type = req.query.type;
        const filterWhere = [];
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
                    in: type.split(","),
                },
            });
        }
        const total = await this.db.meal.count({
            where: {
                AND: filterWhere,
            },
        });
        const { page, limit, skip } = (0, pagination_1.getPagination)(req);
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
    getIdMeal = async (id) => {
        const meal = await this.db.meal.findFirst({
            where: {
                id,
            },
        });
        return meal;
    };
    createMeal = async (data) => {
        const result = await this.db.meal.create({
            data,
        });
        return result;
    };
    updateMeal = async (id, data) => {
        const meals = await this.db.meal.update({
            where: {
                id,
            },
            data,
        });
        return meals;
    };
    deleteMeal = async (id) => {
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
exports.MealService = MealService;
