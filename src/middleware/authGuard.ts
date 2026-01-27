import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserRole } from "../db/generated/enums.js";
import { auth } from "../lib/auth.js";

export const authGuard = (...role: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          message: "You'r unauthorize",
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as UserRole,
        emailVerified: session.user.emailVerified,
      };
      next();
    } catch (error) {
      res.status(httpStatus.FORBIDDEN).send({
        status: false,
        message: "Forbidden",
      });
    }
  };
};
