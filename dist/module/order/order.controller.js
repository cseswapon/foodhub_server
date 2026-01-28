"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const catchAsync_1 = require("@/utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("@/utils/sendResponse");
const order_service_1 = require("./order.service");
class OrdersController {
    providerService = new order_service_1.OrderService();
    getAllOrders = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.getOrder(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve all orders",
            data: result.orders,
            meta: result.meta,
        });
    });
    getSingleOrder = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.getIdOrder(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve single meal",
            data: result,
        });
    });
    createOrder = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.createOrder(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Order created successfully",
            data: result,
        });
    });
    updateOrder = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.updateOrder(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Order updated successfully",
            data: result,
        });
    });
    deleteOrder = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.deleteOrder(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Order deleted successfully",
            data: result,
        });
    });
}
exports.OrdersController = OrdersController;
