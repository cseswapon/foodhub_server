var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { auth } from "@/lib/auth";
import httpStatus from "http-status-codes";
export const authGuard = (...role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const session = yield auth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(httpStatus.UNAUTHORIZED).send({
                    success: false,
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "You'r unauthorize",
                });
            }
            if (role.length && !role.includes(session.user.role)) {
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
                role: session.user.role,
                emailVerified: session.user.emailVerified,
            };
            next();
        }
        catch (error) {
            res.status(httpStatus.FORBIDDEN).send({
                status: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "Forbidden",
            });
        }
    });
};
