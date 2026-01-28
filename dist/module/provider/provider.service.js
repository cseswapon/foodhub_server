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
export class ProviderService {
    constructor() {
        this.db = Database;
        this.getProvider = (req) => __awaiter(this, void 0, void 0, function* () {
            const total = yield this.db.provider.count();
            const { page, limit, skip } = getPagination(req);
            const total_page = Math.ceil(total / limit);
            const providers = yield this.db.provider.findMany({
                take: limit,
                skip: skip,
                orderBy: {
                    created_at: "asc",
                },
            });
            return {
                providers,
                meta: {
                    total,
                    total_page,
                    current_page: page,
                    limit,
                    skip,
                },
            };
        });
        this.getIdProvider = (id) => __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.db.provider.findMany({
                where: {
                    user_id: id,
                },
            });
            return provider;
        });
        this.createProvider = (data, userId) => __awaiter(this, void 0, void 0, function* () {
            // console.log({...data,userId});
            const result = yield this.db.provider.create({
                data: Object.assign(Object.assign({}, data), { user_id: userId }),
            });
            return result;
        });
        this.updateProvider = (id, data, name) => __awaiter(this, void 0, void 0, function* () {
            console.log("id=>", id, "data=>", data);
            const providers = yield this.db.provider.update({
                where: {
                    user_id: id,
                    restaurant_name: name,
                },
                data,
            });
            return providers;
        });
        this.deleteProvider = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.db.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const provider = yield t.provider.findUnique({
                    where: { id },
                });
                if (!provider) {
                    throw new Error("Provider not found");
                }
                yield t.provider.delete({
                    where: { id },
                });
                return { message: "Successfully deleted" };
            }));
        });
    }
}
