import express, { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { ProvidersController } from "./provider.controller";

const router: Router = express.Router();
const providerController = new ProvidersController();

router.get("/", providerController.getAllProviders.bind(providerController));

router.get(
  "/me",
  authGuard("provider"),
  providerController.getAllProvidersme.bind(providerController),
);

router.get(
  "/:id",
  providerController.getSingleProvider.bind(providerController),
);

router.post(
  "/",
  authGuard("provider", "admin"),
  providerController.createProvider.bind(providerController),
);

router.patch(
  "/",
  authGuard("provider", "admin"),
  providerController.updateProvider.bind(providerController),
);

router.delete(
  "/:id",
  authGuard("admin"),
  providerController.deleteProvider.bind(providerController),
);

export default router;
