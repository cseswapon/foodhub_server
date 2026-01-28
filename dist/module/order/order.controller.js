var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { catchAsync } from "@/utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";
import { OrderService } from "./order.service";
export class OrdersController {
    constructor() {
        this.providerService = new OrderService();
        this.getAllOrders = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.getOrder(req);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve all orders",
                data: result.orders,
                meta: result.meta,
            });
        }));
        this.getSingleOrder = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.getIdOrder(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve single meal",
                data: result,
            });
        }));
        this.createOrder = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.createOrder(req);
            sendResponse(res, {
                statusCode: httpStatus.CREATED,
                success: true,
                message: "Order created successfully",
                data: result,
            });
        }));
        this.updateOrder = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.updateOrder(id, req.body);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Order updated successfully",
                data: result,
            });
        }));
        this.deleteOrder = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.deleteOrder(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Order deleted successfully",
                data: result,
            });
        }));
    }
}
