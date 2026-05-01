import { transliterate } from "transliteration";
import { config } from "../../config";

export class EmbeddingService {
  private apiKey: string;
  private apiUrl: string = "https://openrouter.ai/api/v1";
  private embeddingModel: string;

  constructor() {
    this.apiKey = config.OPEN_ROUTER.OPEN_ROUTER_API_KEY || "";
    this.embeddingModel =
      config.OPEN_ROUTER.OPEN_ROUTER_EMBEDDING_MODEL ||
      "nvidia/llama-nemotron-embed-vl-1b-v2:free";

    if (!this.apiKey) {
      throw new Error("OPEN_ROUTER_API_KEY is not set in .env");
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const normalized = transliterate(text).trim();

      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: normalized,
          model: this.embeddingModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.status}`);
      }

      const data = (await response.json()) as any;

      if (!data.data || data.data.length === 0) {
        throw new Error("No embedding data returned");
      }

      return data.data[0].embedding as number[];
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw error;
    }
  }
}
