"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGuard_1 = require("../../middleware/authGuard");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
const providerController = new order_controller_1.OrdersController();
router.get("/all", (0, authGuard_1.authGuard)(), providerController.getAllOrders.bind(providerController));
router.get("/:id", (0, authGuard_1.authGuard)(), providerController.getSingleOrder.bind(providerController));
// order create with customer
router.post("/", (0, authGuard_1.authGuard)("customer"), providerController.createOrder.bind(providerController));
// order status change with provider
router.patch("/:id", (0, authGuard_1.authGuard)("provider"), providerController.updateOrder.bind(providerController));
router.delete("/:id", (0, authGuard_1.authGuard)("admin"), providerController.deleteOrder.bind(providerController));
exports.default = router;
