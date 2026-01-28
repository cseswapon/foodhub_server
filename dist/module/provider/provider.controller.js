"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersController = void 0;
const catchAsync_1 = require("@/utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("@/utils/sendResponse");
const provider_service_1 = require("./provider.service");
class ProvidersController {
    providerService = new provider_service_1.ProviderService();
    getAllProviders = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.getProvider(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve all providers",
            data: result.providers,
            meta: result.meta,
        });
    });
    getSingleProvider = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.getIdProvider(req.user.id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve single provider",
            data: result,
        });
    });
    createProvider = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const userId = req.user.id;
        const result = await this.providerService.createProvider(req.body, userId);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Provider created successfully",
            data: result,
        });
    });
    updateProvider = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.updateProvider(req.user.id, req.body, req.query.name);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Provider updated successfully",
            data: result,
        });
    });
    deleteProvider = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.deleteProvider(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Provider deleted successfully",
            data: result,
        });
    });
}
exports.ProvidersController = ProvidersController;
