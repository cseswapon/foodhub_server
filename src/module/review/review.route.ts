import express, { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { ReviewsController } from "./review.controller";

const router: Router = express.Router();
const reviewController = new ReviewsController()
router.get(
  "/all",
  authGuard(),
  reviewController.getAllReviews.bind(reviewController),
);

router.get(
  "/:id",
  authGuard(),
  reviewController.getSingleReview.bind(reviewController),
);

router.post(
  "/",
  authGuard("provider", "admin"),
  reviewController.createReview.bind(reviewController),
);

router.patch(
  "/:id",
  authGuard("provider", "admin"),
  reviewController.updateReview.bind(reviewController),
);

router.delete(
  "/:id",
  authGuard("admin"),
  reviewController.deleteReview.bind(reviewController),
);

export default router;
