"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsController = void 0;
const catchAsync_1 = require("@/utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("@/utils/sendResponse");
const meal_service_1 = require("./meal.service");
class MealsController {
    providerService = new meal_service_1.MealService();
    getAllMeals = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.getMeal(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve all meals",
            data: result.meals,
            meta: result.meta,
        });
    });
    getSingleMeal = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.getIdMeal(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Retrieve single meal",
            data: result,
        });
    });
    createMeal = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await this.providerService.createMeal(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Meal created successfully",
            data: result,
        });
    });
    updateMeal = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.updateMeal(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Meal updated successfully",
            data: result,
        });
    });
    deleteMeal = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.deleteMeal(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Meal deleted successfully",
            data: result,
        });
    });
}
exports.MealsController = MealsController;
