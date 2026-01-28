"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const db_1 = require("@/db");
const pagination_1 = require("@/utils/pagination");
class UserServices {
    db;
    constructor() {
        this.db = db_1.db;
    }
    async getUserProfile(email) {
        const user = await this.db.user.findFirst({
            where: {
                email,
            },
        });
        return user;
    }
    async getUsers(req) {
        const total = await this.db.user.count();
        const { page, limit, skip } = (0, pagination_1.getPagination)(req);
        const total_page = Math.ceil(total / limit);
        const users = await this.db.user.findMany({
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
    }
    async updateStatusRole(id, data) {
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
        const user = await this.db.user.update({
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
    }
    async updateProfile(userId, data) {
        if (data.role || data.emailVerified || data.status) {
            return "This payload not supported";
        }
        const updateUser = await this.db.user.update({
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
    }
}
exports.UserServices = UserServices;
