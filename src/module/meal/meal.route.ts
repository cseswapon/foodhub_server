import express, { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { MealsController } from "./meal.controller";

const router: Router = express.Router();
const providerController = new MealsController();

router.get("/", providerController.getAllMeals.bind(providerController));
router.get(
  "/me",
  authGuard(),
  providerController.getAllMealsme.bind(providerController),
);

router.get("/:id", providerController.getSingleMeal.bind(providerController));

router.get(
  "/provider/:id",
  authGuard(),
  providerController.getSingleMealProvider.bind(providerController),
);

router.post(
  "/",
  authGuard("provider", "admin"),
  providerController.createMeal.bind(providerController),
);

router.patch(
  "/:id",
  authGuard("provider", "admin"),
  providerController.updateMeal.bind(providerController),
);

router.delete(
  "/:id",
  authGuard("admin"),
  providerController.deleteMeal.bind(providerController),
);

export default router;
