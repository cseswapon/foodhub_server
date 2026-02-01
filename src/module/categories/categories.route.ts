import express, { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { authGuard } from "../../middleware/authGuard";

const router: Router = express.Router();
const categoriesController = new CategoriesController();

router.get(
  "/all",
  categoriesController.getAllCategories.bind(categoriesController),
);

router.get(
  "/:id",
  categoriesController.getSingleCategory.bind(categoriesController),
);

router.post(
  "/",
  authGuard("admin"),
  categoriesController.createCategory.bind(categoriesController),
);

router.patch(
  "/:id",
  authGuard("admin"),
  categoriesController.updateCategory.bind(categoriesController),
);

router.delete(
  "/:id",
  authGuard("admin"),
  categoriesController.deleteCategory.bind(categoriesController),
);

export default router;
