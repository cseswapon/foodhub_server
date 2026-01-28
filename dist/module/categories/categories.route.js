"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("./categories.controller");
const authGuard_1 = require("../../middleware/authGuard");
const router = express_1.default.Router();
const categoriesController = new categories_controller_1.CategoriesController();
router.get("/all", (0, authGuard_1.authGuard)(), categoriesController.getAllCategories.bind(categoriesController));
router.get("/:id", (0, authGuard_1.authGuard)(), categoriesController.getSingleCategory.bind(categoriesController));
router.post("/", (0, authGuard_1.authGuard)("provider", "admin"), categoriesController.createCategory.bind(categoriesController));
router.patch("/:id", (0, authGuard_1.authGuard)("provider", "admin"), categoriesController.updateCategory.bind(categoriesController));
router.delete("/:id", (0, authGuard_1.authGuard)("provider", "admin"), categoriesController.deleteCategory.bind(categoriesController));
exports.default = router;
