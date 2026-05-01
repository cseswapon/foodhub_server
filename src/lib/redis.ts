import Redis from "ioredis";
import { config } from "../config";

const redisUrl = config.REDIS_URL;

const redisClient = redisUrl
  ? new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      tls: redisUrl.startsWith("rediss://") ? {} : undefined,
    })
  : null;

if (redisClient) {
  redisClient.on("error", (error) => {
    console.error("Redis error:", error);
  });
}

const getConnectedClient = async (): Promise<Redis | null> => {
  if (!redisClient) {
    return null;
  }

  if (redisClient.status === "wait") {
    await redisClient.connect();
  }

  return redisClient;
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  try {
    const client = await getConnectedClient();
    if (!client) {
      return null;
    }

    const value = await client.get(key);
    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error("cacheGet error:", error);
    return null;
  }
};

export const cacheSet = async (
  key: string,
  value: unknown,
  ttlSeconds: number,
): Promise<void> => {
  try {
    const client = await getConnectedClient();
    if (!client) {
      return;
    }

    await client.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (error) {
    console.error("cacheSet error:", error);
  }
};

export const cacheDelete = async (key: string): Promise<void> => {
  try {
    const client = await getConnectedClient();
    if (!client) {
      return;
    }

    await client.del(key);
  } catch (error) {
    console.error("cacheDelete error:", error);
  }
};

export const cacheDeleteByPattern = async (pattern: string): Promise<void> => {
  try {
    const client = await getConnectedClient();
    if (!client) {
      return;
    }

    let cursor = "0";

    do {
      const [nextCursor, keys] = await client.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        "100",
      );

      cursor = nextCursor;

      if (keys.length > 0) {
        await client.del(...keys);
      }
    } while (cursor !== "0");
  } catch (error) {
    console.error("cacheDeleteByPattern error:", error);
  }
};
