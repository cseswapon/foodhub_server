import { authGuard } from "./../../middleware/authGuard";

import express, { Router } from "express";
import { UserController } from "./user.controller";

const userController = new UserController();
const router: Router = express.Router();

router.get(
  "/users",
  authGuard("admin"),
  userController.getUsers.bind(userController),
);

router.patch(
  "/users/:id",
  authGuard("admin"),
  userController.updateUser.bind(userController),
);
router.delete(
  "/users/:id",
  authGuard("admin"),
  userController.deleteUser.bind(userController),
);

export default router;
