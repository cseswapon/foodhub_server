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
import { MealService } from "./meal.service";
export class MealsController {
    constructor() {
        this.providerService = new MealService();
        this.getAllMeals = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.getMeal(req);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve all meals",
                data: result.meals,
                meta: result.meta,
            });
        }));
        this.getSingleMeal = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.getIdMeal(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Retrieve single meal",
                data: result,
            });
        }));
        this.createMeal = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.providerService.createMeal(req.body);
            sendResponse(res, {
                statusCode: httpStatus.CREATED,
                success: true,
                message: "Meal created successfully",
                data: result,
            });
        }));
        this.updateMeal = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.updateMeal(id, req.body);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Meal updated successfully",
                data: result,
            });
        }));
        this.deleteMeal = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.providerService.deleteMeal(id);
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: "Meal deleted successfully",
                data: result,
            });
        }));
    }
}
