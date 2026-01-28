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
export class OrderService {
    constructor() {
        this.db = Database;
        this.getOrder = (req) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const status = req.query.status;
            let where = {};
            if (status)
                where.status = status.toUpperCase();
            if (req.user.role === "customer") {
                where.user_id = req.user.id;
            }
            else if (req.user.role === "provider") {
                where.provider_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            }
            const total = yield this.db.order.count({ where });
            const { page, limit, skip } = getPagination(req);
            const total_page = Math.ceil(total / limit);
            const orders = yield this.db.order.findMany({
                where,
                take: limit,
                skip: skip,
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    orderItems: {
                        include: {
                            meal: {
                                select: {
                                    name: true,
                                    price: true,
                                },
                            },
                        },
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            });
            return {
                orders,
                meta: {
                    total,
                    total_page,
                    current_page: page,
                    limit,
                    skip,
                },
            };
        });
        this.getIdOrder = (id) => __awaiter(this, void 0, void 0, function* () {
            const order = yield this.db.order.findFirst({
                where: {
                    id,
                },
            });
            return order;
        });
        this.createOrder = (req) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { provider_id, delivery_address, payment_method, items, } = req.body;
            const providerExists = yield this.db.provider.findUnique({
                where: { id: provider_id },
            });
            if (!providerExists)
                throw new Error("Provider not found");
            for (const item of items) {
                const mealExists = yield this.db.meal.findUnique({
                    where: { id: item.meal_id },
                });
                if (!mealExists)
                    throw new Error(`Meal not found: ${item.meal_id}`);
            }
            const total_price = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const result = yield this.db.order.create({
                data: {
                    user: { connect: { id: userId } },
                    provider: { connect: { id: provider_id } },
                    delivery_address,
                    payment_method,
                    total_price,
                    status: "placed",
                    orderItems: {
                        create: items.map((item) => ({
                            meal_id: item.meal_id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
                include: { orderItems: true },
            });
            return result;
        });
        this.updateOrder = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const order = yield this.db.order.findUnique({
                where: { id },
            });
            if (!order) {
                throw new Error("Order not found");
            }
            const orders = yield this.db.order.update({
                where: {
                    id,
                },
                data,
            });
            return orders;
        });
        this.deleteOrder = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.db.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const order = yield t.order.findUnique({
                    where: { id },
                });
                if (!order) {
                    throw new Error("Order not found");
                }
                yield t.order.delete({
                    where: { id },
                });
                return { message: "Successfully deleted" };
            }));
        });
    }
}
