"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_route_1 = __importDefault(require("@/module/user/user.route"));
const categories_route_1 = __importDefault(require("@/module/categories/categories.route"));
const provider_route_1 = __importDefault(require("@/module/provider/provider.route"));
const meal_route_1 = __importDefault(require("@/module/meal/meal.route"));
const order_route_1 = __importDefault(require("@/module/order/order.route"));
const review_route_1 = __importDefault(require("@/module/review/review.route"));
const router = express_1.default.Router();
const apiVersion = `/api`;
const moduleRouter = [
    {
        path: `${apiVersion}/admin`,
        route: user_route_1.default,
    },
    {
        path: `${apiVersion}/categories`,
        route: categories_route_1.default,
    },
    {
        path: `${apiVersion}/provider`,
        route: provider_route_1.default,
    },
    {
        path: `${apiVersion}/meal`,
        route: meal_route_1.default,
    },
    {
        path: `${apiVersion}/order`,
        route: order_route_1.default,
    },
    {
        path: `${apiVersion}/review`,
        route: review_route_1.default,
    },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
router.use((req, res) => {
    res.status(http_status_codes_1.default.NOT_FOUND).send({
        error: "Not Found",
        message: `${req.originalUrl} - This route is not found`,
    });
});
exports.default = router;
