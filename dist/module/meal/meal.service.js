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
export class MealService {
    constructor() {
        this.db = Database;
        this.getMeal = (req) => __awaiter(this, void 0, void 0, function* () {
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
                    price: Object.assign(Object.assign({}, (minPrice && { gte: Number(minPrice) })), (maxPrice && { lte: Number(maxPrice) })),
                });
            }
            if (type) {
                filterWhere.push({
                    dietary_type: {
                        in: type.split(","),
                    },
                });
            }
            const total = yield this.db.meal.count({
                where: {
                    AND: filterWhere,
                },
            });
            const { page, limit, skip } = getPagination(req);
            const total_page = Math.ceil(total / limit);
            const meals = yield this.db.meal.findMany({
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
        });
        this.getIdMeal = (id) => __awaiter(this, void 0, void 0, function* () {
            const meal = yield this.db.meal.findFirst({
                where: {
                    id,
                },
            });
            return meal;
        });
        this.createMeal = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.meal.create({
                data,
            });
            return result;
        });
        this.updateMeal = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const meals = yield this.db.meal.update({
                where: {
                    id,
                },
                data,
            });
            return meals;
        });
        this.deleteMeal = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.db.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const meal = yield t.meal.findUnique({
                    where: { id },
                });
                if (!meal) {
                    throw new Error("Meal not found");
                }
                yield t.meal.delete({
                    where: { id },
                });
                return { message: "Successfully deleted" };
            }));
        });
    }
}
