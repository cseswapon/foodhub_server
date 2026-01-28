"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGuard_1 = require("../../middleware/authGuard");
const provider_controller_1 = require("./provider.controller");
const router = express_1.default.Router();
const providerController = new provider_controller_1.ProvidersController();
router.get("/all", (0, authGuard_1.authGuard)("admin"), providerController.getAllProviders.bind(providerController));
router.get("/profile", (0, authGuard_1.authGuard)(), providerController.getSingleProvider.bind(providerController));
router.post("/", (0, authGuard_1.authGuard)("provider", "admin"), providerController.createProvider.bind(providerController));
router.patch("/", (0, authGuard_1.authGuard)("provider", "admin"), providerController.updateProvider.bind(providerController));
router.delete("/:id", (0, authGuard_1.authGuard)("admin"), providerController.deleteProvider.bind(providerController));
exports.default = router;
