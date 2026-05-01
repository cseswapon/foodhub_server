import { config } from "../../config";

export class LLMService {
  private apiKey: string;
  private apiUrl: string = "https://openrouter.ai/api/v1";
  private model: string;

  constructor() {
    this.apiKey = config.OPEN_ROUTER.OPEN_ROUTER_API_KEY || "";
    this.model =
      config.OPEN_ROUTER.OPEN_ROUTER_TEXT_MODEL ||
      "nvidia/nemotron-3-super-120b-a12b:free";

    if (!this.apiKey) {
      throw new Error("OpenRouter api key is missing...");
    }
  }

  async generateResponse(
    systemPrompt: string,
    userQuery: string,
    asJson: boolean = false,
  ): Promise<string> {
    try {
      const bodyPayload: any = {
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuery },
        ],
        temperature: 0.1,
        max_tokens: 1500,
      };

      if (
        asJson &&
        (this.model.includes("gpt") || this.model.includes("openai"))
      ) {
        bodyPayload.response_format = { type: "json_object" };
      }

      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://uranto.com",
          "X-Title": "Uranto E-Commerce",
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as any;
        throw new Error(
          `OpenRouter API error: ${response.status} - ${errorData.error?.message || "unknown error"}`,
        );
      }

      const data = (await response.json()) as any;
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating LLM response:", error);
      throw error;
    }
  }
}
