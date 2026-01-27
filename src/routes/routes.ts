import express, { Request, Response, Router } from "express";
import httpStatus from "http-status-codes";
import userAuthRoute from "@/module/user/user.route";
import categoriesRoute from "@/module/categories/categories.route";

const router: Router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const apiVersion = `/api`;

const moduleRouter: IRoute[] = [
  {
    path: `${apiVersion}/admin`,
    route: userAuthRoute,
  },
  {
    path: `${apiVersion}/categories`,
    route: categoriesRoute,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

router.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).send({
    error: "Not Found",
    message: `${req.originalUrl} - This route is not found`,
  });
});

export default router;
