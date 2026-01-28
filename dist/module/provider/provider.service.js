"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const db_1 = require("@/db");
const pagination_1 = require("@/utils/pagination");
class ProviderService {
    db = db_1.db;
    getProvider = async (req) => {
        const total = await this.db.provider.count();
        const { page, limit, skip } = (0, pagination_1.getPagination)(req);
        const total_page = Math.ceil(total / limit);
        const providers = await this.db.provider.findMany({
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
    };
    getIdProvider = async (id) => {
        const provider = await this.db.provider.findMany({
            where: {
                user_id: id,
            },
        });
        return provider;
    };
    createProvider = async (data, userId) => {
        // console.log({...data,userId});
        const result = await this.db.provider.create({
            data: {
                ...data,
                user_id: userId,
                //   user: {
                //     connect: {
                //       id: userId
                //     }
                //   }
            },
        });
        return result;
    };
    updateProvider = async (id, data, name) => {
        console.log("id=>", id, "data=>", data);
        const providers = await this.db.provider.update({
            where: {
                user_id: id,
                restaurant_name: name,
            },
            data,
        });
        return providers;
    };
    deleteProvider = async (id) => {
        return this.db.$transaction(async (t) => {
            const provider = await t.provider.findUnique({
                where: { id },
            });
            if (!provider) {
                throw new Error("Provider not found");
            }
            await t.provider.delete({
                where: { id },
            });
            return { message: "Successfully deleted" };
        });
    };
}
exports.ProviderService = ProviderService;
