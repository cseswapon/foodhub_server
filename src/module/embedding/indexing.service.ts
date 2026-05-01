import { db } from "../../db";
import { Prisma } from "../../db/generated/client";
import { EmbeddingService } from "./embedding.service";

const toVectorLiteral = (vector: number[]) => `[${vector.join(",")}]`;

export class IndexingService {
  private embeddingService: EmbeddingService;

  constructor() {
    this.embeddingService = new EmbeddingService();
  }

  async getStats(): Promise<{
    totalDocuments: number;
    mealDocuments: number;
    deletedDocuments: number;
  }> {
    const [totalDocuments, mealDocuments, deletedDocuments] = await Promise.all([
      db.documentEmbedding.count(),
      db.documentEmbedding.count({
        where: {
          sourceType: "MEAL",
          isDelete: false,
        },
      }),
      db.documentEmbedding.count({
        where: {
          isDelete: true,
        },
      }),
    ]);

    return {
      totalDocuments,
      mealDocuments,
      deletedDocuments,
    };
  }

  async indexDocument(
    chunkKey: string,
    sourceType: string,
    sourceId: string,
    content: string,
    sourceLabel?: string,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    try {
      const embedding = await this.embeddingService.generateEmbedding(content);
      const vectorLiteral = toVectorLiteral(embedding);

      const updatedCount = await db.$executeRaw(Prisma.sql`
        UPDATE "document_embeddings"
        SET
          "sourceType" = ${sourceType},
          "sourceId" = ${sourceId},
          "sourceLabel" = ${sourceLabel ?? null},
          "content" = ${content},
          "metaData" = ${JSON.stringify(metadata ?? {})}::jsonb,
          "embedding" = CAST(${vectorLiteral} AS vector),
          "isDelete" = false,
          "deletedAt" = null,
          "updatedAt" = NOW()
        WHERE "chunkKey" = ${chunkKey}
      `);

      if (updatedCount > 0) {
        return;
      }

      await db.$executeRaw(Prisma.sql`
        INSERT INTO "document_embeddings"
        (
          "id",
          "chunkKey",
          "sourceType",
          "sourceId",
          "sourceLabel",
          "content",
          "metaData",
          "embedding",
          "updatedAt"
        )
        VALUES
        (
          gen_random_uuid(),
          ${chunkKey},
          ${sourceType},
          ${sourceId},
          ${sourceLabel ?? null},
          ${content},
          ${JSON.stringify(metadata ?? {})}::jsonb,
          CAST(${vectorLiteral} AS vector),
          NOW()
        )
      `);
    } catch (error) {
      console.error("indexDocument error:", error);
      throw error;
    }
  }

  async indexProductsData(): Promise<{
    success: boolean;
    message: string;
    indexedCount: number;
  }> {
    try {
      console.log("Fetching products for indexing...");

      const meals = await db.meal.findMany({
        where: {
          is_available: true,
        },
        include: {
          category: true,
          reviews: true,
        },
      });

      console.log(`Fetched ${meals.length} products. Starting indexing...`);

      let indexedCount = 0;

      for (const meal of meals) {
        const content = `${meal.name} - ${meal.description} Category: ${meal.category.name} Reviews: ${meal.reviews
          .map((r) => r.comment)
          .join("; ")}`;
        const metadata = {
          name: meal.name,
          description: meal.description,
          category: meal.category.name,
          reviews: meal.reviews.map((r) => ({
            rating: r.rating,
            comment: r.comment,
          })),
          price: meal.price,
        };
        const chunkKey = `MEAL_${meal.id}`;
        await this.indexDocument(
          chunkKey,
          "MEAL",
          meal.id,
          content,
          meal.name,
          metadata,
        );
        indexedCount++;
      }

      console.log(`Successfully indexed ${indexedCount} meals.`);
      return {
        success: true,
        message: `Successfully indexed ${indexedCount} meals.`,
        indexedCount,
      };
    } catch (error) {
      console.error("indexProductsData error:", error);
      throw error;
    }
  }

  async similaritySearch(
    queryEmbedding: number[],
    limit = 5,
    threshold = 0.4,
    sourceType = "MEAL",
  ): Promise<
    Array<{
      id: string;
      sourceType: string;
      sourceId: string;
      sourceLabel: string | null;
      content: string;
      metadata: unknown;
      similarity: number;
    }>
  > {
    const vectorLiteral = toVectorLiteral(queryEmbedding);

    const results = await db.$queryRaw<
      Array<{
        id: string;
        sourceType: string;
        sourceId: string;
        sourceLabel: string | null;
        content: string;
        metadata: unknown;
        similarity: number;
      }>
    >(
      Prisma.sql`
        SELECT
          id,
          "sourceType",
          "sourceId",
          "sourceLabel",
          "content",
          "metaData" AS "metadata",
          1 - (embedding <=> CAST(${vectorLiteral} AS vector)) AS similarity
        FROM "document_embeddings"
        WHERE "isDelete" = false
          AND "sourceType" = ${sourceType}
          AND 1 - (embedding <=> CAST(${vectorLiteral} AS vector)) >= ${threshold}
        ORDER BY embedding <=> CAST(${vectorLiteral} AS vector)
        LIMIT ${limit}
      `,
    );

    return results;
  }
}
