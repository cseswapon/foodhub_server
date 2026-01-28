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
export class CategoriesService {
    constructor() {
        this.db = Database;
        this.getCategories = (req) => __awaiter(this, void 0, void 0, function* () {
            const total = yield this.db.categories.count();
            const { page, limit, skip } = getPagination(req);
            const total_page = Math.ceil(total / limit);
            const categories = yield this.db.categories.findMany({
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
        });
        this.getIdCategories = (id) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.db.categories.findFirst({
                where: {
                    id,
                },
            });
            return categories;
        });
        this.createCategories = (data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.categories.create({
                data,
            });
            return result;
        });
        this.updateCategories = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.db.categories.update({
                where: {
                    id,
                },
                data,
            });
            return categories;
        });
        this.deleteCategories = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.db.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const categories = yield t.categories.findFirst({
                    where: {
                        id,
                    },
                });
                if (!categories) {
                    return "Categories not found";
                }
                yield t.categories.delete({
                    where: {
                        id,
                    },
                });
                return { message: "Successfully deleted" };
            }));
        });
    }
}
