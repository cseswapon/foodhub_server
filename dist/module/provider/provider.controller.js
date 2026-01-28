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
import { ProviderService } from "./provider.service";
export class ProvidersController {
    constructor() {
        this.providerService = new ProviderService();
        this.getAllProviders = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.getProvider(req);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve all providers",
                data: result.providers,
                meta: result.meta,
            });
        }));
        this.getSingleProvider = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.getIdProvider(req.user.id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve single provider",
                data: result,
            });
        }));
        this.createProvider = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const result = yield this.providerService.createProvider(req.body, userId);
            sendResponse(res, {
                statusCode: httpStatus.CREATED,
                success: true,
                message: "Provider created successfully",
                data: result,
            });
        }));
        this.updateProvider = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.updateProvider(req.user.id, req.body, req.query.name);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Provider updated successfully",
                data: result,
            });
        }));
        this.deleteProvider = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.deleteProvider(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Provider deleted successfully",
                data: result,
            });
        }));
    }
}
