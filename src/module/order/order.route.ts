import express, { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { OrdersController } from "./order.controller";

const router: Router = express.Router();
const providerController = new OrdersController();

router.get(
  "/all",
  authGuard(),
  providerController.getAllOrders.bind(providerController),
);

router.get(
  "/meal",
  authGuard(),
  providerController.getAllOrdersMeal.bind(providerController),
);

router.get(
  "/:id",
  authGuard(),
  providerController.getSingleOrder.bind(providerController),
);

// order create with customer
router.post(
  "/",
  authGuard("customer"),
  providerController.createOrder.bind(providerController),
);

// order status change with provider
router.patch(
  "/:id",
  authGuard("provider", "customer", "admin"),
  providerController.updateOrder.bind(providerController),
);

router.delete(
  "/:id",
  authGuard("admin"),
  providerController.deleteOrder.bind(providerController),
);

export default router;
