"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const db_1 = require("@/db");
const pagination_1 = require("@/utils/pagination");
class CategoriesService {
    db = db_1.db;
    getCategories = async (req) => {
        const total = await this.db.categories.count();
        const { page, limit, skip } = (0, pagination_1.getPagination)(req);
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
                current_page: page,
                limit,
                skip,
            },
        };
    };
    getIdCategories = async (id) => {
        const categories = await this.db.categories.findFirst({
            where: {
                id,
            },
        });
        return categories;
    };
    createCategories = async (data) => {
        const result = await this.db.categories.create({
            data,
        });
        return result;
    };
    updateCategories = async (id, data) => {
        const categories = await this.db.categories.update({
            where: {
                id,
            },
            data,
        });
        return categories;
    };
    deleteCategories = async (id) => {
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
exports.CategoriesService = CategoriesService;
