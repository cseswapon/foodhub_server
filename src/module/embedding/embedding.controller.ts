import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EmbeddingService } from "./embedding.service";
import { IndexingService } from "./indexing.service";

export class EmbeddingController {
  private static readonly indexingService = new IndexingService();
  private static readonly embeddingService = new EmbeddingService();

  static getStats = catchAsync(async (_req: Request, res: Response) => {
    const stats = await EmbeddingController.indexingService.getStats();

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

    const queryEmbedding =
      await EmbeddingController.embeddingService.generateEmbedding(query);
    const matches = await EmbeddingController.indexingService.similaritySearch(
      queryEmbedding,
      Number(limit),
      Number(threshold),
      sourceType,
    );

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
