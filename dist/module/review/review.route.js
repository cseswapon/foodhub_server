"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGuard_1 = require("../../middleware/authGuard");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
const reviewController = new review_controller_1.ReviewsController();
router.get("/all", (0, authGuard_1.authGuard)(), reviewController.getAllReviews.bind(reviewController));
router.get("/:id", (0, authGuard_1.authGuard)(), reviewController.getSingleReview.bind(reviewController));
router.post("/", (0, authGuard_1.authGuard)("customer"), reviewController.createReview.bind(reviewController));
router.patch("/:id", (0, authGuard_1.authGuard)("customer", "admin"), reviewController.updateReview.bind(reviewController));
router.delete("/:id", (0, authGuard_1.authGuard)("admin", "customer"), reviewController.deleteReview.bind(reviewController));
exports.default = router;
