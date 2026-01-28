"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGuard_1 = require("../../middleware/authGuard");
const meal_controller_1 = require("./meal.controller");
const router = express_1.default.Router();
const providerController = new meal_controller_1.MealsController();
router.get("/", (0, authGuard_1.authGuard)(), providerController.getAllMeals.bind(providerController));
router.get("/:id", (0, authGuard_1.authGuard)(), providerController.getSingleMeal.bind(providerController));
router.post("/", (0, authGuard_1.authGuard)("provider", "admin"), providerController.createMeal.bind(providerController));
router.patch("/:id", (0, authGuard_1.authGuard)("provider", "admin"), providerController.updateMeal.bind(providerController));
router.delete("/:id", (0, authGuard_1.authGuard)("admin"), providerController.deleteMeal.bind(providerController));
exports.default = router;
