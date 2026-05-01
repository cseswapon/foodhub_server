import { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { EmbeddingController } from "./embedding.controller";

const router = Router();

router.get("/stats", authGuard("admin"), EmbeddingController.getStats);

router.post(
  "/ingest-product",
  authGuard("admin"),
  EmbeddingController.ingestProducts,
);

router.post("/query", EmbeddingController.queryRag);

export default router;
