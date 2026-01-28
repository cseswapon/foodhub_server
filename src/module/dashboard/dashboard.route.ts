import express, { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { DashboardController } from "./dashboard.controller";

const router: Router = express.Router();
const dashboardController = new DashboardController();

router.get(
  "/",
  authGuard(),
  dashboardController.getStatic.bind(dashboardController),
);

export default router;
