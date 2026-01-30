import express, { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { ReviewsController } from "./review.controller";

const router: Router = express.Router();
const reviewController = new ReviewsController();
router.get(
  "/all",
  authGuard("admin","customer"),
  reviewController.getAllReviews.bind(reviewController),
);

router.get(
  "/:id",
  authGuard("admin","customer"),
  reviewController.getSingleReview.bind(reviewController),
);

router.post(
  "/",
  authGuard("customer"),
  reviewController.createReview.bind(reviewController),
);

router.patch(
  "/:id",
  authGuard("customer", "admin"),
  reviewController.updateReview.bind(reviewController),
);

router.delete(
  "/:id",
  authGuard("admin", "customer"),
  reviewController.deleteReview.bind(reviewController),
);

export default router;
