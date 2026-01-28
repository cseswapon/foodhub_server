import { authGuard } from "./../../middleware/authGuard";
import express from "express";
import { UserController } from "./user.controller";
const userController = new UserController();
const router = express.Router();
router.get("/users", authGuard("admin"), userController.getUsers.bind(userController));
router.patch("/users/:id", authGuard("admin"), userController.updateUser.bind(userController));
export default router;
