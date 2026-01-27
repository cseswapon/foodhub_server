import express, { Request, Response, Router } from "express";
import httpStatus from "http-status-codes";

const router: Router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const apiVersion = `/api/v1`;

const moduleRouter: IRoute[] = [
  {
    path: `${apiVersion}/test`,
    route: router.get("/", (req, res) => {
      res.send({
        message: "testing route",
      });
    }),
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
