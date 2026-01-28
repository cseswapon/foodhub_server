var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import httpStatus from "http-status-codes";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import router from "./routes/routes";
import { authGuard } from "./middleware/authGuard";
import { UserServices } from "./module/user/user.service";
import { sendResponse } from "./utils/sendResponse";
import { UserController } from "./module/user/user.controller";
const userService = new UserServices();
const userController = new UserController();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
// user profile
app.patch("/api/users/profile", authGuard(), userController.updateProfile.bind(userController));
app.use("/api/auth/me", authGuard(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserProfile(req.user.email);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile",
        data: user,
    });
}));
// auth route
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
    res.status(httpStatus.OK).send({
        success: true,
        message: "Hey Baby Programer !!! What's up ?",
        time: new Date().toISOString(),
    });
});
// all route
app.use(router);
export default app;
