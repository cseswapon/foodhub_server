import express, { Application, Request, Response } from "express";
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

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

// user profile
app.patch(
  "/api/users/profile",
  authGuard(),
  userController.updateProfile.bind(userController),
);
app.use("/api/auth/me", authGuard(), async (req: Request, res: Response) => {
  const user = await userService.getUserProfile(req.user.email as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile",
    data: user,
  });
});
// auth route
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    success: true,
    message: "Hey Baby Programer !!! What's up?",
    time: new Date().toISOString(),
  });
});

// all route
app.use(router);

export default app;
