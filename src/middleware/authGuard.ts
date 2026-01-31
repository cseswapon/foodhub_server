import { UserRole } from "../db/generated/enums";
import { auth } from "../lib/auth";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

export const authGuard = (...role: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You'r unauthorize",
        });
      }
      if (role.length && !role.includes(session.user.role as UserRole)) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You'r role mismatch",
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
        statusCode: httpStatus.FORBIDDEN,
        message: "Forbidden",
      });
    }
  };
};
