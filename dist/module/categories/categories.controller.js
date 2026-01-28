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
import { CategoriesService } from "./categories.service";
import httpStatus from "http-status-codes";
import { sendResponse } from "@/utils/sendResponse";
export class CategoriesController {
    constructor() {
        this.categoriesService = new CategoriesService();
        this.getAllCategories = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.categoriesService.getCategories(req);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve all categories",
                data: result.categories,
                meta: result.meta,
            });
        }));
        this.getSingleCategory = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.categoriesService.getIdCategories(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve single category",
                data: result,
            });
        }));
        this.createCategory = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.categoriesService.createCategories(req.body);
            sendResponse(res, {
                statusCode: httpStatus.CREATED,
                success: true,
                message: "Category created successfully",
                data: result,
            });
        }));
        this.updateCategory = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.categoriesService.updateCategories(id, req.body);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Category updated successfully",
                data: result,
            });
        }));
        this.deleteCategory = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.categoriesService.deleteCategories(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Category deleted successfully",
                data: result,
            });
        }));
    }
}
