import express, { Application, Request, Response } from "express";
import httpStatus from "http-status-codes";
import cors from "cors";
import router from "./routes/routes.js";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

const app: Application = express();

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    success: true,
    message: "Hey Baby Programer !!! What's up ?",
    time: new Date().toISOString(),
  });
});

app.use(router);

export default app;
