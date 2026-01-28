var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db as database } from "@/db";
import { getPagination } from "@/utils/pagination";
export class UserServices {
    constructor() {
        this.db = database;
    }
    getUserProfile(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.user.findFirst({
                where: {
                    email,
                },
            });
            return user;
        });
    }
    getUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield this.db.user.count();
            const { page, limit, skip } = getPagination(req);
            const total_page = Math.ceil(total / limit);
            const users = yield this.db.user.findMany({
                take: limit,
                skip: skip,
                orderBy: {
                    createdAt: "asc",
                },
            });
            return {
                users,
                meta: {
                    total,
                    total_page,
                    page,
                    limit,
                    skip,
                },
            };
        });
    }
    updateStatusRole(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = {};
            if (data.role === "admin") {
                throw Error("Change no role");
            }
            if (data.role !== undefined) {
                updateData.role = data.role;
            }
            if (data.status !== undefined) {
                updateData.status = data.status;
            }
            if (Object.keys(updateData).length === 0) {
                throw new Error("Nothing to update");
            }
            const user = yield this.db.user.update({
                where: {
                    id: id,
                },
                data: updateData,
                select: {
                    id: true,
                    email: true,
                    status: true,
                    role: true,
                },
            });
            return user;
        });
    }
    updateProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.role || data.emailVerified || data.status) {
                return "This payload not supported";
            }
            const updateUser = yield this.db.user.update({
                where: { id: userId },
                data,
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                    email: true,
                    role: true,
                    updatedAt: true,
                },
            });
            return updateUser;
        });
    }
}
