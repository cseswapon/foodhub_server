"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const auth_1 = require("@/lib/auth");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const authGuard = (...role) => {
    return async (req, res, next) => {
        try {
            const session = await auth_1.auth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                    success: false,
                    statusCode: http_status_codes_1.default.UNAUTHORIZED,
                    message: "You'r unauthorize",
                });
            }
            if (role.length && !role.includes(session.user.role)) {
                return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
                    success: false,
                    statusCode: http_status_codes_1.default.UNAUTHORIZED,
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
            res.status(http_status_codes_1.default.FORBIDDEN).send({
                status: false,
                statusCode: http_status_codes_1.default.FORBIDDEN,
                message: "Forbidden",
            });
        }
    };
};
exports.authGuard = authGuard;
