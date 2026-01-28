"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const catchAsync_1 = require("@/utils/catchAsync");
const categories_service_1 = require("./categories.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("@/utils/sendResponse");
class CategoriesController {
    categoriesService = new categories_service_1.CategoriesService();
    getAllCategories = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.categoriesService.getCategories(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve all categories",
            data: result.categories,
            meta: result.meta,
        });
    });
    getSingleCategory = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.categoriesService.getIdCategories(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve single category",
            data: result,
        });
    });
    createCategory = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.categoriesService.createCategories(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Category created successfully",
            data: result,
        });
    });
    updateCategory = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.categoriesService.updateCategories(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    });
    deleteCategory = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.categoriesService.deleteCategories(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    });
}
exports.CategoriesController = CategoriesController;
