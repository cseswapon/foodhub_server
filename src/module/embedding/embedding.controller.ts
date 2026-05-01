import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import {
  cacheDelete,
  cacheDeleteByPattern,
  cacheGet,
  cacheSet,
} from "../../lib/redis";
import { EmbeddingService } from "./embedding.service";
import { IndexingService } from "./indexing.service";

export class EmbeddingController {
  private static readonly indexingService = new IndexingService();
  private static readonly embeddingService = new EmbeddingService();
  private static readonly statsCacheKey = "embedding:stats";
  private static readonly statsTtlSeconds = 300;
  private static readonly queryTtlSeconds = 120;

  static getStats = catchAsync(async (_req: Request, res: Response) => {
    const cachedStats = await cacheGet<{
      totalDocuments: number;
      mealDocuments: number;
      deletedDocuments: number;
    }>(EmbeddingController.statsCacheKey);

    if (cachedStats) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Embedding stats fetched successfully",
        data: cachedStats,
      });
    }

    const stats = await EmbeddingController.indexingService.getStats();
    await cacheSet(
      EmbeddingController.statsCacheKey,
      stats,
      EmbeddingController.statsTtlSeconds,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Embedding stats fetched successfully",
      data: stats,
    });
  });

  static ingestProducts = catchAsync(async (_req: Request, res: Response) => {
    const result =
      await EmbeddingController.indexingService.indexProductsData();

    await cacheDelete(EmbeddingController.statsCacheKey);
    await cacheDeleteByPattern("embedding:query:*");

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result.message,
      data: result,
    });
  });

  static queryRag = catchAsync(async (req: Request, res: Response) => {
    const {
      query,
      limit = 5,
      threshold = 0.4,
      sourceType = "MEAL",
    } = req.body as {
      query?: string;
      limit?: number;
      threshold?: number;
      sourceType?: string;
    };

    if (!query || !query.trim()) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "query is required",
        data: null,
      });
    }

    const normalizedQuery = query.trim().toLowerCase();
    const parsedLimit = Number(limit);
    const parsedThreshold = Number(threshold);
    const cacheKey = `embedding:query:${sourceType}:${parsedLimit}:${parsedThreshold}:${normalizedQuery}`;

    const cachedMatches = await cacheGet<
      Array<{
        id: string;
        sourceType: string;
        sourceId: string;
        sourceLabel: string | null;
        content: string;
        metadata: unknown;
        similarity: number;
      }>
    >(cacheKey);

    if (cachedMatches) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Cached query completed successfully",
        data: {
          query,
          matches: cachedMatches,
        },
      });
    }

    const queryEmbedding =
      await EmbeddingController.embeddingService.generateEmbedding(query);
    const matches = await EmbeddingController.indexingService.similaritySearch(
      queryEmbedding,
      parsedLimit,
      parsedThreshold,
      sourceType,
    );

    await cacheSet(cacheKey, matches, EmbeddingController.queryTtlSeconds);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Query completed successfully",
      data: {
        query,
        matches,
      },
    });
  });
}
