var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express9 from "express";
import httpStatus11 from "http-status-codes";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/db/index.ts
import { PrismaPg } from "@prisma/adapter-pg";

// src/config/index.ts
import dotenv from "dotenv";
dotenv.config();
var config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BACKEND_URL: process.env.BACKEND_URL,
  APP_URL: process.env.APP_URL,
  OPEN_ROUTER: {
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY,
    OPEN_ROUTER_EMBEDDING_MODEL: process.env.OPEN_ROUTER_EMBEDDING_MODEL,
    OPEN_ROUTER_TEXT_MODEL: process.env.OPEN_ROUTER_TEXT_MODEL
  },
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_PHONE: process.env.ADMIN_PHONE
};

// src/db/generated/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/db/generated/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [
    "postgresqlExtensions"
  ],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Categories {\n  id   String @id @default(uuid())\n  name String @unique()\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  meals Meal[]\n\n  @@index([name], name: "idx_category_name")\n  @@map("categories")\n}\n\nenum UserRole {\n  customer\n  provider\n  admin\n}\n\nenum UserStatus {\n  activate\n  suspend\n}\n\nenum DietaryType {\n  veg\n  non_veg\n  vegan\n}\n\nenum PaymentMethod {\n  cod\n  online\n}\n\nenum OrderStatus {\n  placed\n  preparing\n  ready\n  delivered\n  cancelled\n}\n\nmodel Meal {\n  id String @id @default(uuid())\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id], onDelete: Cascade)\n\n  category_id String\n  category    Categories @relation(fields: [category_id], references: [id], onDelete: Cascade)\n\n  name         String\n  description  String\n  price        Decimal     @db.Decimal(10, 2)\n  dietary_type DietaryType\n  is_available Boolean     @default(true)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  orderItems Order_Item[]\n  reviews    Review[]\n\n  @@index([dietary_type], name: "idx_meal_dietary_type")\n  @@index([name], name: "idx_meal_name")\n  @@index([price], name: "idx_meal_price")\n  @@map("meals")\n}\n\nmodel Order {\n  id      String @id @default(uuid())\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id])\n\n  total_price      Decimal       @db.Decimal(10, 2)\n  delivery_address String\n  payment_method   PaymentMethod\n\n  status       OrderStatus\n  cancelled_by String?\n\n  created_at DateTime     @default(now())\n  updated_at DateTime     @updatedAt()\n  orderItems Order_Item[]\n\n  @@index([status], name: "idx_order_status")\n  @@index([user_id], name: "idx_order_user_id")\n  @@map("orders")\n}\n\nmodel Order_Item {\n  id      String @id @default(uuid())\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id])\n\n  meal_id String\n  meal    Meal   @relation(fields: [meal_id], references: [id])\n\n  quantity Int\n  price    Decimal @db.Decimal(10, 2)\n\n  created_at DateTime? @default(now())\n  updated_at DateTime? @updatedAt\n\n  @@index([orderId], name: "idx_order_item_order_id")\n  @@index([meal_id], name: "idx_order_item_meal_id")\n  @@map("order_items")\n}\n\nmodel Provider {\n  id String @id @default(uuid())\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id], onDelete: Cascade)\n\n  restaurant_name String  @unique()\n  description     String\n  address         String\n  is_open         Boolean @default(true)\n\n  fb_link String\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  // meals  Meal[]\n  // orders Order[]\n\n  @@index([restaurant_name], name: "idx_provider_restaurant_name")\n  @@index([user_id], name: "idx_provider_user_id")\n  @@map("providers")\n}\n\nmodel DocumentEmbedding {\n  id          String  @id @default(uuid())\n  chunkKey    String\n  sourceType  String\n  sourceId    String\n  sourceLabel String?\n  content     String\n  metaData    Json?\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  embedding Unsupported("vector(2048)") // SQL QUERY: CREATE EXTENSION vector; \n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([isDelete], name: "idx_document_embedding_isDelete")\n  @@index([sourceType], name: "idx_document_embeddings_sourceType")\n  @@index([sourceId], name: "idx_document_embeddings_sourceId")\n  @@map("document_embeddings")\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  meal_id String\n  meal    Meal   @relation(fields: [meal_id], references: [id])\n\n  rating Decimal @db.Decimal(10, 1)\n\n  comment String?\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id])\n\n  is_visible Boolean @default(true)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  @@index([meal_id], name: "idx_review_meal_id")\n  @@index([user_id], name: "idx_review_user_id")\n  @@map("reviews")\n}\n\ngenerator client {\n  provider        = "prisma-client"\n  output          = "../generated"\n  previewFeatures = ["postgresqlExtensions"]\n}\n\ndatasource db {\n  provider   = "postgresql"\n  extensions = [vector]\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          UserRole   @default(customer)\n  phone         String\n  address       String?\n  status        UserStatus @default(activate)\n  sessions      Session[]\n  accounts      Account[]\n  provider      Provider[]\n  orders        Order[]\n  reviews       Review[]\n  meals         Meal[]\n\n  @@unique([email])\n  @@index([role], name: "idx_user_role")\n  @@index([status], name: "idx_user_status")\n  @@index([email], name: "idx_user_email")\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoriesToMeal"}],"dbName":"categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"MealToUser"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMeal"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"dietary_type","kind":"enum","type":"DietaryType"},{"name":"is_available","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"Order_Item","relationName":"MealToOrder_Item"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":"meals"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"total_price","kind":"scalar","type":"Decimal"},{"name":"delivery_address","kind":"scalar","type":"String"},{"name":"payment_method","kind":"enum","type":"PaymentMethod"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"cancelled_by","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"Order_Item","relationName":"OrderToOrder_Item"}],"dbName":"orders"},"Order_Item":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrder_Item"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrder_Item"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"order_items"},"Provider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderToUser"},{"name":"restaurant_name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"is_open","kind":"scalar","type":"Boolean"},{"name":"fb_link","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"providers"},"DocumentEmbedding":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"chunkKey","kind":"scalar","type":"String"},{"name":"sourceType","kind":"scalar","type":"String"},{"name":"sourceId","kind":"scalar","type":"String"},{"name":"sourceLabel","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"metaData","kind":"scalar","type":"Json"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"document_embeddings"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"rating","kind":"scalar","type":"Decimal"},{"name":"comment","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"is_visible","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"provider","kind":"object","type":"Provider","relationName":"ProviderToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// src/db/generated/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoriesScalarFieldEnum: () => CategoriesScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DocumentEmbeddingScalarFieldEnum: () => DocumentEmbeddingScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  MealScalarFieldEnum: () => MealScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  Order_ItemScalarFieldEnum: () => Order_ItemScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderScalarFieldEnum: () => ProviderScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Categories: "Categories",
  Meal: "Meal",
  Order: "Order",
  Order_Item: "Order_Item",
  Provider: "Provider",
  DocumentEmbedding: "DocumentEmbedding",
  Review: "Review",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoriesScalarFieldEnum = {
  id: "id",
  name: "name",
  created_at: "created_at",
  updated_at: "updated_at"
};
var MealScalarFieldEnum = {
  id: "id",
  user_id: "user_id",
  category_id: "category_id",
  name: "name",
  description: "description",
  price: "price",
  dietary_type: "dietary_type",
  is_available: "is_available",
  created_at: "created_at",
  updated_at: "updated_at"
};
var OrderScalarFieldEnum = {
  id: "id",
  user_id: "user_id",
  total_price: "total_price",
  delivery_address: "delivery_address",
  payment_method: "payment_method",
  status: "status",
  cancelled_by: "cancelled_by",
  created_at: "created_at",
  updated_at: "updated_at"
};
var Order_ItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  meal_id: "meal_id",
  quantity: "quantity",
  price: "price",
  created_at: "created_at",
  updated_at: "updated_at"
};
var ProviderScalarFieldEnum = {
  id: "id",
  user_id: "user_id",
  restaurant_name: "restaurant_name",
  description: "description",
  address: "address",
  is_open: "is_open",
  fb_link: "fb_link",
  created_at: "created_at",
  updated_at: "updated_at"
};
var DocumentEmbeddingScalarFieldEnum = {
  id: "id",
  chunkKey: "chunkKey",
  sourceType: "sourceType",
  sourceId: "sourceId",
  sourceLabel: "sourceLabel",
  content: "content",
  metaData: "metaData",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  meal_id: "meal_id",
  rating: "rating",
  comment: "comment",
  user_id: "user_id",
  is_visible: "is_visible",
  created_at: "created_at",
  updated_at: "updated_at"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  address: "address",
  status: "status"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/db/generated/enums.ts
var OrderStatus = {
  placed: "placed",
  preparing: "preparing",
  ready: "ready",
  delivered: "delivered",
  cancelled: "cancelled"
};

// src/db/generated/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/db/index.ts
var connectionString = `${config.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var db = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  secret: config.BETTER_AUTH_SECRET,
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100
  },
  database: prismaAdapter(db, {
    provider: "postgresql"
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "https://foodhub-client-eight.vercel.app",
    config.APP_URL,
    config.BACKEND_URL
  ].filter((origin) => Boolean(origin)),
  /* advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  }, */
  /* hooks: {
    after: async (ctx: any) => { 
      const setCookie = ctx.response.headers.get("set-cookie");
      if (setCookie && process.env.NODE_ENV === "production") {
        const newCookie = setCookie.replace(
          /SameSite=Lax/g,
          "SameSite=None; Secure",
        );
        ctx.response.headers.set("set-cookie", newCookie);
      }
      return ctx;
    }
  }, */
  user: {
    additionalFields: {
      role: {
        type: ["customer", "provider", "admin"],
        defaultValue: "customer"
      },
      phone: {
        type: "string",
        required: true
      },
      address: {
        type: "string",
        required: false
      },
      status: {
        type: ["activate", "suspend"],
        defaultValue: "activate"
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false
  }
});

// src/routes/routes.ts
import express8 from "express";
import httpStatus10 from "http-status-codes";

// src/middleware/authGuard.ts
import httpStatus from "http-status-codes";
var authGuard = (...role) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You'r unauthorize"
        });
      }
      if (role.length && !role.includes(session.user.role)) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You'r role mismatch"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      next();
    } catch (error) {
      res.status(httpStatus.FORBIDDEN).send({
        status: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Forbidden"
      });
    }
  };
};

// src/module/user/user.route.ts
import express from "express";

// src/module/user/user.controller.ts
import httpStatus2 from "http-status-codes";

// src/utils/pagination.ts
var getPagination = (req) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 1e3, 1);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// src/module/user/user.service.ts
var UserServices = class {
  db;
  constructor() {
    this.db = db;
  }
  async getUserProfile(email) {
    const user = await this.db.user.findFirst({
      where: {
        email
      }
    });
    return user;
  }
  async getUsers(req) {
    const total = await this.db.user.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const users = await this.db.user.findMany({
      take: limit,
      skip,
      orderBy: {
        createdAt: "asc"
      }
    });
    return {
      users,
      meta: {
        total,
        total_page,
        page,
        limit,
        skip
      }
    };
  }
  async getUsersDetails(req) {
    const id = req.params.id;
    const users = await this.db.user.findUnique({
      where: {
        id
      }
    });
    return {
      users
    };
  }
  async updateStatusRole(id, data) {
    const updateData = {};
    if (data.role === "admin") {
      throw Error("Change no role");
    }
    if (data.role !== void 0) {
      updateData.role = data.role;
    }
    if (data.status !== void 0) {
      updateData.status = data.status;
    }
    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }
    const user = await this.db.user.update({
      where: {
        id
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        status: true,
        role: true
      }
    });
    return user;
  }
  async deleteUser(id) {
    const isExistUser = await this.db.user.findUnique({
      where: {
        id
      }
    });
    if (!isExistUser) {
      throw Error("User't found");
    }
    if (isExistUser?.role === "admin") {
      throw Error("Don't delete");
    }
    const deleteUser = await this.db.user.delete({
      where: {
        id
      }
    });
    return deleteUser;
  }
  async updateProfile(userId, data) {
    if (data.role || data.emailVerified || data.status) {
      return "This payload not supported";
    }
    const updateUser = await this.db.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        email: true,
        role: true,
        updatedAt: true
      }
    });
    return updateUser;
  }
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data || void 0 || null
  });
};

// src/module/user/user.controller.ts
var UserController = class {
  userService = new UserServices();
  getUserProfile = catchAsync(async (req, res) => {
    const user = await this.userService.getUserProfile(
      req.user.email
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "My Profile",
      data: user
    });
  });
  getUsers = catchAsync(async (req, res) => {
    const { users, meta } = await this.userService.getUsers(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "All Users",
      data: users,
      meta: {
        current_page: meta.page,
        limit: meta.limit,
        total: meta.total,
        total_page: meta.total_page
      }
    });
  });
  getUsersDetails = catchAsync(async (req, res) => {
    const { users } = await this.userService.getUsersDetails(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "Users Details",
      data: users
    });
  });
  updateUser = catchAsync(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if (req.user.role?.includes("admin") && req.user.id === id) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus2.OK,
        message: "Admin can't change won status",
        data: null
      });
    }
    const updateUser = await this.userService.updateStatusRole(id, body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "User update successfully",
      data: updateUser
    });
  });
  deleteUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    if (req.user.role?.includes("admin") && req.user.id === id) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus2.OK,
        message: "Admin can't change won status",
        data: null
      });
    }
    const deleteUser = await this.userService.deleteUser(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "User delete successfully",
      data: deleteUser
    });
  });
  updateProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const body = req.body;
    if (!body.name && !body.phone && !body.address) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus2.BAD_REQUEST,
        message: "Nothing to update"
      });
    }
    const updatedUser = await this.userService.updateProfile(userId, body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus2.OK,
      message: "Profile updated successfully",
      data: updatedUser
    });
  });
};

// src/module/user/user.route.ts
var userController = new UserController();
var router = express.Router();
router.get(
  "/users",
  authGuard("admin"),
  userController.getUsers.bind(userController)
);
router.get(
  "/users/:id",
  authGuard("admin"),
  userController.getUsersDetails.bind(userController)
);
router.patch(
  "/users/:id",
  authGuard("admin"),
  userController.updateUser.bind(userController)
);
router.delete(
  "/users/:id",
  authGuard("admin"),
  userController.deleteUser.bind(userController)
);
var user_route_default = router;

// src/module/categories/categories.route.ts
import express2 from "express";

// src/module/categories/categories.service.ts
var CategoriesService = class {
  db = db;
  getCategories = async (req) => {
    const total = await this.db.categories.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const categories = await this.db.categories.findMany({
      take: limit,
      skip,
      orderBy: {
        created_at: "asc"
      }
    });
    return {
      categories,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  getIdCategories = async (id) => {
    const categories = await this.db.categories.findFirst({
      where: {
        id
      }
    });
    return categories;
  };
  createCategories = async (data) => {
    const result = await this.db.categories.create({
      data
    });
    return result;
  };
  updateCategories = async (id, data) => {
    const categories = await this.db.categories.update({
      where: {
        id
      },
      data
    });
    return categories;
  };
  deleteCategories = async (id) => {
    return this.db.$transaction(async (t) => {
      const categories = await t.categories.findFirst({
        where: {
          id
        }
      });
      if (!categories) {
        return "Categories not found";
      }
      await t.categories.delete({
        where: {
          id
        }
      });
      return { message: "Successfully deleted" };
    });
  };
};

// src/module/categories/categories.controller.ts
import httpStatus3 from "http-status-codes";

// src/lib/redis.ts
import Redis from "ioredis";
var redisUrl = config.REDIS_URL;
var redisClient = redisUrl ? new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableReadyCheck: true,
  tls: redisUrl.startsWith("rediss://") ? {} : void 0
}) : null;
if (redisClient) {
  redisClient.on("error", (error) => {
    console.error("Redis error:", error);
  });
}
var getConnectedClient = async () => {
  if (!redisClient) {
    return null;
  }
  if (redisClient.status === "wait") {
    await redisClient.connect();
  }
  return redisClient;
};
var cacheGet = async (key) => {
  try {
    const client = await getConnectedClient();
    if (!client) {
      return null;
    }
    const value = await client.get(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error("cacheGet error:", error);
    return null;
  }
};
var cacheSet = async (key, value, ttlSeconds) => {
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
var cacheDelete = async (key) => {
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
var cacheDeleteByPattern = async (pattern) => {
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
        "100"
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

// src/module/categories/categories.controller.ts
var CATEGORIES_LIST_TTL = 300;
var CATEGORIES_SINGLE_TTL = 300;
var CategoriesController = class {
  categoriesService = new CategoriesService();
  getAllCategories = catchAsync(
    async (req, res, next) => {
      const cacheKey = `categories:list:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus3.OK,
          success: true,
          message: "Retrieve all categories",
          data: cached.categories,
          meta: cached.meta
        });
      }
      const result = await this.categoriesService.getCategories(req);
      await cacheSet(
        cacheKey,
        { categories: result.categories, meta: result.meta },
        CATEGORIES_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus3.OK,
        success: true,
        message: "Retrieve all categories",
        data: result.categories,
        meta: result.meta
      });
    }
  );
  getSingleCategory = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const cacheKey = `categories:single:${id}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus3.OK,
          success: true,
          message: "Retrieve single category",
          data: cached
        });
      }
      const result = await this.categoriesService.getIdCategories(id);
      await cacheSet(cacheKey, result, CATEGORIES_SINGLE_TTL);
      sendResponse(res, {
        statusCode: httpStatus3.OK,
        success: true,
        message: "Retrieve single category",
        data: result
      });
    }
  );
  createCategory = catchAsync(
    async (req, res, next) => {
      const result = await this.categoriesService.createCategories(req.body);
      await cacheDeleteByPattern("categories:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus3.CREATED,
        success: true,
        message: "Category created successfully",
        data: result
      });
    }
  );
  updateCategory = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.categoriesService.updateCategories(
        id,
        req.body
      );
      await cacheDeleteByPattern("categories:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus3.OK,
        success: true,
        message: "Category updated successfully",
        data: result
      });
    }
  );
  deleteCategory = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.categoriesService.deleteCategories(
        id
      );
      await cacheDeleteByPattern("categories:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus3.OK,
        success: true,
        message: "Category deleted successfully",
        data: result
      });
    }
  );
};

// src/module/categories/categories.route.ts
var router2 = express2.Router();
var categoriesController = new CategoriesController();
router2.get(
  "/all",
  categoriesController.getAllCategories.bind(categoriesController)
);
router2.get(
  "/:id",
  categoriesController.getSingleCategory.bind(categoriesController)
);
router2.post(
  "/",
  authGuard("admin"),
  categoriesController.createCategory.bind(categoriesController)
);
router2.patch(
  "/:id",
  authGuard("admin"),
  categoriesController.updateCategory.bind(categoriesController)
);
router2.delete(
  "/:id",
  authGuard("admin"),
  categoriesController.deleteCategory.bind(categoriesController)
);
var categories_route_default = router2;

// src/module/provider/provider.route.ts
import express3 from "express";

// src/module/provider/provider.controller.ts
import httpStatus4 from "http-status-codes";

// src/module/provider/provider.service.ts
var ProviderService = class {
  db = db;
  getProvider = async (req) => {
    const total = await this.db.provider.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const providers = await this.db.user.findMany({
      where: {
        role: "provider"
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "asc"
      }
    });
    return {
      providers,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  /*   getProviderMeal = async (req: Request, id: string) => {
      const providers = await this.db.provider.findUnique({
        where: {
          id,
          meals: {
            some: {
              is_available: true,
            },
          },
        },
        include: {
          meals: true,
        },
      });
  
      return {
        providers,
      };
    }; */
  getProviderme = async (req) => {
    const total = await this.db.provider.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const providers = await this.db.provider.findMany({
      where: {
        user_id: req.user.id
      },
      take: limit,
      skip,
      orderBy: {
        created_at: "asc"
      }
    });
    return {
      providers,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  getIdProvider = async (id) => {
    try {
      const result = await this.db.$transaction(async (tx) => {
        const provider = await tx.user.findUnique({
          where: { id }
        });
        if (!provider) {
          throw new Error("Provider not found");
        }
        const meals = await tx.meal.findMany({
          where: { user_id: id },
          include: {
            category: true
          }
        });
        return {
          provider,
          meals
        };
      });
      return result;
    } catch (error) {
      console.error("Error in getIdProvider transaction:", error);
      throw error;
    }
  };
  createProvider = async (data, userId) => {
    const result = await this.db.provider.create({
      data: {
        ...data,
        user_id: userId
        //   user: {
        //     connect: {
        //       id: userId
        //     }
        //   }
      }
    });
    return result;
  };
  updateProvider = async (id, data, name) => {
    console.log("id=>", id, "data=>", data);
    const providers = await this.db.provider.update({
      where: {
        user_id: id,
        restaurant_name: name
      },
      data
    });
    return providers;
  };
  deleteProvider = async (id) => {
    return this.db.$transaction(async (t) => {
      await t.provider.delete({
        where: { id }
      });
      return { message: "Successfully deleted" };
    });
  };
};

// src/module/provider/provider.controller.ts
var PROVIDER_LIST_TTL = 180;
var PROVIDER_SINGLE_TTL = 180;
var ProvidersController = class {
  providerService = new ProviderService();
  getAllProviders = catchAsync(
    async (req, res, next) => {
      const cacheKey = `providers:list:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Retrieve all providers",
          data: cached.providers,
          meta: cached.meta
        });
      }
      const result = await this.providerService.getProvider(req);
      await cacheSet(
        cacheKey,
        { providers: result.providers, meta: result.meta },
        PROVIDER_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus4.OK,
        success: true,
        message: "Retrieve all providers",
        data: result.providers,
        meta: result.meta
      });
    }
  );
  /* getAllProvidersMeal = catchAsync(
      async (req: Request,res: Response,next: NextFunction) => {
        const id = req.params.id as string;
        const result = await this.providerService.getProviderMeal(req,id);
  
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Retrieve all providers meal",
          data: result.providers
        });
      },
    ); */
  getAllProvidersme = catchAsync(
    async (req, res, next) => {
      const cacheKey = `providers:me:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Retrieve my all providers",
          data: cached.providers,
          meta: cached.meta
        });
      }
      const result = await this.providerService.getProviderme(req);
      await cacheSet(
        cacheKey,
        { providers: result.providers, meta: result.meta },
        PROVIDER_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus4.OK,
        success: true,
        message: "Retrieve my all providers",
        data: result.providers,
        meta: result.meta
      });
    }
  );
  getSingleProvider = catchAsync(
    async (req, res, next) => {
      const cacheKey = `providers:single:${req.params.id}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Retrieve single provider",
          data: cached
        });
      }
      const result = await this.providerService.getIdProvider(
        req.params.id
      );
      await cacheSet(cacheKey, result, PROVIDER_SINGLE_TTL);
      sendResponse(res, {
        statusCode: httpStatus4.OK,
        success: true,
        message: "Retrieve single provider",
        data: result
      });
    }
  );
  createProvider = catchAsync(
    async (req, res, next) => {
      const userId = req.user.id;
      const result = await this.providerService.createProvider(
        req.body,
        userId
      );
      await cacheDeleteByPattern("providers:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus4.CREATED,
        success: true,
        message: "Provider created successfully",
        data: result
      });
    }
  );
  updateProvider = catchAsync(
    async (req, res, next) => {
      const result = await this.providerService.updateProvider(
        req.user.id,
        req.body,
        req.query.name
      );
      await cacheDeleteByPattern("providers:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus4.OK,
        success: true,
        message: "Provider updated successfully",
        data: result
      });
    }
  );
  deleteProvider = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.providerService.deleteProvider(id);
      await cacheDeleteByPattern("providers:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus4.OK,
        success: true,
        message: "Provider deleted successfully",
        data: result
      });
    }
  );
};

// src/module/provider/provider.route.ts
var router3 = express3.Router();
var providerController = new ProvidersController();
router3.get("/", providerController.getAllProviders.bind(providerController));
router3.get(
  "/me",
  authGuard("provider"),
  providerController.getAllProvidersme.bind(providerController)
);
router3.get(
  "/:id",
  providerController.getSingleProvider.bind(providerController)
);
router3.post(
  "/",
  authGuard("provider", "admin"),
  providerController.createProvider.bind(providerController)
);
router3.patch(
  "/",
  authGuard("provider", "admin"),
  providerController.updateProvider.bind(providerController)
);
router3.delete(
  "/:id",
  authGuard("admin", "provider"),
  providerController.deleteProvider.bind(providerController)
);
var provider_route_default = router3;

// src/module/meal/meal.route.ts
import express4 from "express";

// src/module/meal/meal.controller.ts
import httpStatus5 from "http-status-codes";

// src/module/meal/meal.service.ts
var MealService = class {
  db = db;
  getMeal = async (req) => {
    const search = req.query.search;
    const maxPrice = req.query.maxPrice;
    const minPrice = req.query.minPrice;
    const type = req.query.type;
    const filterWhere = [];
    if (search) {
      filterWhere.push({
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      });
    }
    if (minPrice || maxPrice) {
      filterWhere.push({
        price: {
          ...minPrice && { gte: Number(minPrice) },
          ...maxPrice && { lte: Number(maxPrice) }
        }
      });
    }
    if (type) {
      filterWhere.push({
        dietary_type: {
          in: type.split(",")
        }
      });
    }
    const total = await this.db.meal.count({
      where: {
        AND: filterWhere,
        is_available: true
      }
    });
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const meals = await this.db.meal.findMany({
      where: {
        AND: filterWhere,
        is_available: true
      },
      take: limit,
      skip,
      orderBy: {
        created_at: "asc"
      }
    });
    return {
      meals,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  getMealme = async (req) => {
    const total = await this.db.meal.count({
      where: {
        user_id: req.user.id
      }
    });
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const meals = await this.db.meal.findMany({
      where: {
        user_id: req.user.id
      },
      take: limit,
      skip,
      orderBy: {
        created_at: "asc"
      }
    });
    return {
      meals,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  getIdMeal = async (id) => {
    const meal = await this.db.meal.findFirst({
      where: {
        id,
        is_available: true
      },
      include: {
        category: true,
        user: true,
        // provider: true,
        reviews: {
          where: {
            is_visible: true
          },
          select: {
            comment: true,
            rating: true,
            created_at: true,
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    return meal;
  };
  getSingleMealProvider = async (id) => {
    const meal = await this.db.meal.findFirst({
      where: {
        id
      },
      include: {
        category: true,
        // provider: true,
        user: true,
        reviews: {
          where: {
            is_visible: true
          },
          select: {
            comment: true,
            rating: true,
            created_at: true,
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    return meal;
  };
  createMeal = async (data) => {
    const result = await this.db.meal.create({
      data
    });
    return result;
  };
  updateMeal = async (id, data) => {
    const meals = await this.db.meal.update({
      where: {
        id
      },
      data
    });
    return meals;
  };
  deleteMeal = async (id) => {
    console.log(id);
    return this.db.$transaction(async (t) => {
      const meal = await t.meal.findUnique({
        where: { id }
      });
      if (!meal) {
        throw new Error("Meal not found");
      }
      await t.meal.delete({
        where: { id }
      });
      return { message: "Successfully deleted" };
    });
  };
};

// src/module/meal/meal.controller.ts
var MEAL_LIST_TTL = 180;
var MEAL_SINGLE_TTL = 180;
var MealsController = class {
  providerService = new MealService();
  getAllMeals = catchAsync(
    async (req, res, next) => {
      const cacheKey = `meals:list:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Retrieve all meals",
          data: cached.meals,
          meta: cached.meta
        });
      }
      const result = await this.providerService.getMeal(req);
      await cacheSet(
        cacheKey,
        { meals: result.meals, meta: result.meta },
        MEAL_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus5.OK,
        success: true,
        message: "Retrieve all meals",
        data: result.meals,
        meta: result.meta
      });
    }
  );
  getAllMealsme = catchAsync(
    async (req, res, next) => {
      const cacheKey = `meals:me:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Retrieve all meals",
          data: cached.meals,
          meta: cached.meta
        });
      }
      const result = await this.providerService.getMealme(req);
      await cacheSet(
        cacheKey,
        { meals: result.meals, meta: result.meta },
        MEAL_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus5.OK,
        success: true,
        message: "Retrieve all meals",
        data: result.meals,
        meta: result.meta
      });
    }
  );
  getSingleMeal = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const cacheKey = `meals:single:public:${id}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Retrieve single meal",
          data: cached
        });
      }
      const result = await this.providerService.getIdMeal(id);
      await cacheSet(cacheKey, result, MEAL_SINGLE_TTL);
      sendResponse(res, {
        statusCode: httpStatus5.OK,
        success: true,
        message: "Retrieve single meal",
        data: result
      });
    }
  );
  getSingleMealProvider = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const cacheKey = `meals:single:provider:${id}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Retrieve single meal",
          data: cached
        });
      }
      const result = await this.providerService.getSingleMealProvider(
        id
      );
      await cacheSet(cacheKey, result, MEAL_SINGLE_TTL);
      sendResponse(res, {
        statusCode: httpStatus5.OK,
        success: true,
        message: "Retrieve single meal",
        data: result
      });
    }
  );
  createMeal = catchAsync(
    async (req, res, next) => {
      const result = await this.providerService.createMeal(req.body);
      await cacheDeleteByPattern("meals:*");
      await cacheDeleteByPattern("providers:single:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus5.CREATED,
        success: true,
        message: "Meal created successfully",
        data: result
      });
    }
  );
  updateMeal = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.providerService.updateMeal(
        id,
        req.body
      );
      await cacheDeleteByPattern("meals:*");
      await cacheDeleteByPattern("providers:single:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus5.OK,
        success: true,
        message: "Meal updated successfully",
        data: result
      });
    }
  );
  deleteMeal = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.providerService.deleteMeal(id);
      await cacheDeleteByPattern("meals:*");
      await cacheDeleteByPattern("providers:single:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus5.OK,
        success: true,
        message: "Meal deleted successfully",
        data: result
      });
    }
  );
};

// src/module/meal/meal.route.ts
var router4 = express4.Router();
var providerController2 = new MealsController();
router4.get("/", providerController2.getAllMeals.bind(providerController2));
router4.get(
  "/me",
  authGuard(),
  providerController2.getAllMealsme.bind(providerController2)
);
router4.get("/:id", providerController2.getSingleMeal.bind(providerController2));
router4.get(
  "/provider/:id",
  authGuard(),
  providerController2.getSingleMealProvider.bind(providerController2)
);
router4.post(
  "/",
  authGuard("provider", "admin"),
  providerController2.createMeal.bind(providerController2)
);
router4.patch(
  "/:id",
  authGuard("provider", "admin"),
  providerController2.updateMeal.bind(providerController2)
);
router4.delete(
  "/:id",
  authGuard("admin", "provider"),
  providerController2.deleteMeal.bind(providerController2)
);
var meal_route_default = router4;

// src/module/order/order.route.ts
import express5 from "express";

// src/module/order/order.controller.ts
import httpStatus6 from "http-status-codes";

// src/module/order/order.service.ts
var OrderService = class {
  db = db;
  getOrder = async (req) => {
    const status = req.query.status;
    const where = {};
    if (status && Object.values(OrderStatus).includes(status.toLowerCase())) {
      where.status = status.toLowerCase();
    }
    if (req.user.role === "customer") {
      where.user_id = req.user.id;
    }
    if (req.user.role === "provider") {
      where.orderItems = {
        some: {
          meal: {
            user_id: req.user.id
          }
        }
      };
    }
    const total = await this.db.order.count({ where });
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const orders = await this.db.order.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        created_at: "desc"
      },
      include: {
        orderItems: {
          include: {
            meal: {
              select: {
                name: true,
                price: true,
                user_id: true
              }
            }
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return {
      orders,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  getOrderMeal = async (req) => {
    const orders = await this.db.order_Item.findMany({
      where: {
        order: {
          user_id: req.user.id
        }
      },
      include: {
        meal: {
          select: {
            name: true
          }
        },
        order: {
          select: {
            user_id: true
          }
        }
      }
    });
    return {
      orders
    };
  };
  getIdOrder = async (id) => {
    const order = await this.db.order.findFirst({
      where: {
        id
      },
      include: {
        // provider: true,
        user: true,
        orderItems: {
          select: {
            quantity: true,
            meal: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    });
    return order;
  };
  createOrder = async (req) => {
    const userId = req.user.id;
    const {
      delivery_address,
      payment_method,
      items
    } = req.body;
    for (const item of items) {
      const mealExists = await this.db.meal.findUnique({
        where: { id: item.meal_id }
      });
      if (!mealExists) throw new Error(`Meal not found: ${item.meal_id}`);
    }
    const total_price = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const result = await this.db.order.create({
      data: {
        user: { connect: { id: userId } },
        delivery_address,
        payment_method,
        total_price,
        status: "placed",
        orderItems: {
          create: items.map((item) => ({
            meal_id: item.meal_id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { orderItems: true }
    });
    return result;
  };
  updateOrder = async (id, data, role, userId) => {
    console.log(id, data, role);
    const order = await this.db.order.findUnique({
      where: { id },
      include: {
        // provider: {
        //   select: {
        //     user_id: true,
        //   },
        // },
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status === "delivered") {
      throw new Error("Order already delivered");
    }
    if (role === "customer") {
      if (data.status !== "cancelled") {
        throw new Error("Customer can only cancel orders");
      }
      if (["preparing", "ready", "delivered"].includes(order.status)) {
        throw new Error("Order can\u2019t be cancelled at this stage");
      }
      if (order.user_id !== userId) {
        throw new Error("Unauthorized order access");
      }
    }
    if (role === "provider") {
      if (!["ready", "preparing", "delivered", "cancelled"].includes(
        data.status
      )) {
        throw new Error("Invalid status update by provider");
      }
    }
    return this.db.order.update({
      where: { id },
      data: {
        ...data,
        cancelled_by: data.status === "cancelled" ? role : null
      }
    });
  };
  deleteOrder = async (id) => {
    return this.db.$transaction(async (t) => {
      const order = await t.order.findUnique({
        where: { id }
      });
      if (!order) {
        throw new Error("Order not found");
      }
      await t.order.delete({
        where: { id }
      });
      return { message: "Successfully deleted" };
    });
  };
};

// src/module/order/order.controller.ts
var ORDER_LIST_TTL = 120;
var ORDER_SINGLE_TTL = 120;
var OrdersController = class {
  providerService = new OrderService();
  getAllOrders = catchAsync(
    async (req, res, next) => {
      const cacheKey = `orders:list:${req.user.role}:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Retrieve all orders",
          data: cached.orders,
          meta: cached.meta
        });
      }
      const result = await this.providerService.getOrder(req);
      await cacheSet(
        cacheKey,
        { orders: result.orders, meta: result.meta },
        ORDER_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus6.OK,
        success: true,
        message: "Retrieve all orders",
        data: result.orders,
        meta: result.meta
      });
    }
  );
  getAllOrdersMeal = catchAsync(
    async (req, res, next) => {
      const cacheKey = `orders:meal:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Retrieve all orders",
          data: cached.orders
        });
      }
      const result = await this.providerService.getOrderMeal(req);
      await cacheSet(cacheKey, { orders: result.orders }, ORDER_LIST_TTL);
      sendResponse(res, {
        statusCode: httpStatus6.OK,
        success: true,
        message: "Retrieve all orders",
        data: result.orders
      });
    }
  );
  getSingleOrder = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const cacheKey = `orders:single:${id}:${req.user.role}:${req.user.id}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Retrieve single meal",
          data: cached
        });
      }
      const result = await this.providerService.getIdOrder(id);
      await cacheSet(cacheKey, result, ORDER_SINGLE_TTL);
      sendResponse(res, {
        statusCode: httpStatus6.OK,
        success: true,
        message: "Retrieve single meal",
        data: result
      });
    }
  );
  createOrder = catchAsync(
    async (req, res, next) => {
      const result = await this.providerService.createOrder(req);
      await cacheDeleteByPattern("orders:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus6.CREATED,
        success: true,
        message: "Order created successfully",
        data: result
      });
    }
  );
  updateOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.providerService.updateOrder(
      id,
      req.body,
      req.user.role,
      req.user.id
    );
    await cacheDeleteByPattern("orders:*");
    await cacheDeleteByPattern("dashboard:*");
    sendResponse(res, {
      statusCode: httpStatus6.OK,
      success: true,
      message: "Order updated successfully",
      data: result
    });
  });
  deleteOrder = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.providerService.deleteOrder(id);
      await cacheDeleteByPattern("orders:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus6.OK,
        success: true,
        message: "Order deleted successfully",
        data: result
      });
    }
  );
};

// src/module/order/order.route.ts
var router5 = express5.Router();
var providerController3 = new OrdersController();
router5.get(
  "/all",
  authGuard(),
  providerController3.getAllOrders.bind(providerController3)
);
router5.get(
  "/meal",
  authGuard(),
  providerController3.getAllOrdersMeal.bind(providerController3)
);
router5.get(
  "/:id",
  authGuard(),
  providerController3.getSingleOrder.bind(providerController3)
);
router5.post(
  "/",
  authGuard("customer"),
  providerController3.createOrder.bind(providerController3)
);
router5.patch(
  "/:id",
  authGuard("provider", "customer", "admin"),
  providerController3.updateOrder.bind(providerController3)
);
router5.delete(
  "/:id",
  authGuard("admin"),
  providerController3.deleteOrder.bind(providerController3)
);
var order_route_default = router5;

// src/module/review/review.route.ts
import express6 from "express";

// src/module/review/review.controller.ts
import httpStatus7 from "http-status-codes";

// src/module/review/review.service.ts
var ReviewService = class {
  db = db;
  getPublicReviews = async (limit = 8) => {
    const safeLimit = Number.isNaN(limit) ? 8 : Math.min(Math.max(limit, 1), 20);
    const reviews = await this.db.review.findMany({
      where: {
        is_visible: true
      },
      take: safeLimit,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });
    return reviews;
  };
  getReview = async (req) => {
    const userId = req.user.id;
    const role = req.user.role;
    const { page, limit, skip } = getPagination(req);
    let whereCondition = {};
    if (role !== "admin") {
      whereCondition = {
        is_visible: true
      };
    }
    if (role === "customer") {
      whereCondition.user_id = userId;
    }
    const total = await this.db.review.count({
      where: whereCondition
    });
    const total_page = Math.ceil(total / limit);
    const reviews = await this.db.review.findMany({
      where: whereCondition,
      take: limit,
      skip,
      orderBy: {
        created_at: "asc"
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });
    return {
      reviews,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip
      }
    };
  };
  getIdReview = async (id, userId, role) => {
    const whereCondition = {
      id
    };
    if (role === "customer") {
      whereCondition.user_id = userId;
    }
    const review = await this.db.review.findFirst({
      where: whereCondition,
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });
    if (!review) {
      throw new Error("Review not found or access denied");
    }
    return review;
  };
  createReview = async (userId, mealId, rating, comment) => {
    const orderItem = await this.db.order_Item.findFirst({
      where: {
        meal_id: mealId,
        order: {
          user_id: userId,
          status: "delivered"
        }
      }
    });
    if (!orderItem) {
      throw new Error("You can review only after ordering this meal");
    }
    const alreadyReviewed = await this.db.review.findFirst({
      where: {
        user_id: userId,
        meal_id: mealId
      }
    });
    if (alreadyReviewed) {
      throw new Error("You have already reviewed this meal");
    }
    return this.db.review.create({
      data: {
        user: { connect: { id: userId } },
        meal: { connect: { id: mealId } },
        rating,
        comment: comment ?? null,
        is_visible: true
      }
    });
  };
  updateReview = async (reviewId, userId, role, data) => {
    const review = await this.db.review.findUnique({
      where: { id: reviewId }
    });
    if (role !== "admin") {
      delete data.is_visible;
    }
    if (!review) {
      throw new Error("Review not found");
    }
    if (role === "customer" && review.user_id !== userId) {
      throw new Error("You are not allowed to update this review");
    }
    return this.db.review.update({
      where: { id: reviewId },
      data
    });
  };
  deleteReview = async (id) => {
    return this.db.$transaction(async (t) => {
      const review = await t.review.findUnique({
        where: { id }
      });
      if (!review) {
        throw new Error("Review not found");
      }
      await t.review.delete({
        where: { id }
      });
      return { message: "Successfully deleted" };
    });
  };
};

// src/module/review/review.controller.ts
var REVIEW_LIST_TTL = 180;
var REVIEW_SINGLE_TTL = 180;
var ReviewsController = class {
  reviewService = new ReviewService();
  getPublicReviews = catchAsync(async (req, res) => {
    const rawLimit = Number(req.query.limit);
    const limit = Number.isNaN(rawLimit) ? 8 : rawLimit;
    const cacheKey = `reviews:public:${limit}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return sendResponse(res, {
        statusCode: httpStatus7.OK,
        success: true,
        message: "Retrieve public reviews",
        data: cached
      });
    }
    const reviews = await this.reviewService.getPublicReviews(limit);
    await cacheSet(cacheKey, reviews, REVIEW_LIST_TTL);
    sendResponse(res, {
      statusCode: httpStatus7.OK,
      success: true,
      message: "Retrieve public reviews",
      data: reviews
    });
  });
  getAllReviews = catchAsync(
    async (req, res, next) => {
      const cacheKey = `reviews:list:${req.user.role}:${req.user.id}:${req.originalUrl}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        return sendResponse(res, {
          statusCode: httpStatus7.OK,
          success: true,
          message: "Retrieve all reviews",
          data: cached.reviews,
          meta: cached.meta
        });
      }
      const result = await this.reviewService.getReview(req);
      await cacheSet(
        cacheKey,
        { reviews: result.reviews, meta: result.meta },
        REVIEW_LIST_TTL
      );
      sendResponse(res, {
        statusCode: httpStatus7.OK,
        success: true,
        message: "Retrieve all reviews",
        data: result.reviews,
        meta: result.meta
      });
    }
  );
  getSingleReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const cacheKey = `reviews:single:${id}:${req.user.role}:${req.user.id}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return sendResponse(res, {
        statusCode: httpStatus7.OK,
        success: true,
        message: "Retrieve single review",
        data: cached
      });
    }
    const result = await this.reviewService.getIdReview(
      id,
      req.user.id,
      req.user.role
    );
    await cacheSet(cacheKey, result, REVIEW_SINGLE_TTL);
    sendResponse(res, {
      statusCode: httpStatus7.OK,
      success: true,
      message: "Retrieve single review",
      data: result
    });
  });
  createReview = catchAsync(
    async (req, res, next) => {
      const {
        mealId,
        rating,
        comment
      } = req.body;
      const result = await this.reviewService.createReview(
        req.user.id,
        mealId,
        rating,
        comment
      );
      await cacheDeleteByPattern("reviews:*");
      await cacheDeleteByPattern("meals:single:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus7.CREATED,
        success: true,
        message: "Review created successfully",
        data: result
      });
    }
  );
  updateReview = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.reviewService.updateReview(
        id,
        req.user.id,
        req.user.role,
        req.body
      );
      await cacheDeleteByPattern("reviews:*");
      await cacheDeleteByPattern("meals:single:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus7.OK,
        success: true,
        message: "Review updated successfully",
        data: result
      });
    }
  );
  deleteReview = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
      const result = await this.reviewService.deleteReview(id);
      await cacheDeleteByPattern("reviews:*");
      await cacheDeleteByPattern("meals:single:*");
      await cacheDeleteByPattern("dashboard:*");
      sendResponse(res, {
        statusCode: httpStatus7.OK,
        success: true,
        message: "Review deleted successfully",
        data: result
      });
    }
  );
};

// src/module/review/review.route.ts
var router6 = express6.Router();
var reviewController = new ReviewsController();
router6.get("/public", reviewController.getPublicReviews.bind(reviewController));
router6.get(
  "/all",
  authGuard("admin", "customer"),
  reviewController.getAllReviews.bind(reviewController)
);
router6.get(
  "/:id",
  authGuard("admin", "customer"),
  reviewController.getSingleReview.bind(reviewController)
);
router6.post(
  "/",
  authGuard("customer"),
  reviewController.createReview.bind(reviewController)
);
router6.patch(
  "/:id",
  authGuard("admin"),
  reviewController.updateReview.bind(reviewController)
);
router6.delete(
  "/:id",
  authGuard("admin"),
  reviewController.deleteReview.bind(reviewController)
);
var review_route_default = router6;

// src/module/dashboard/dashboard.route.ts
import express7 from "express";

// src/module/dashboard/dashboard.service.ts
var DashboardService = class {
  db = db;
  getStatic = async (req) => {
    const { role, id } = req.user;
    return this.db.$transaction(async (t) => {
      const userFilter = (status, userRole) => {
        const filter = {};
        if (status) filter.status = status;
        if (userRole) filter.role = userRole;
        if (role !== "admin") filter.id = id;
        return filter;
      };
      const orderFilter = (status) => {
        return role === "admin" ? { status } : { status, provider_id: id };
      };
      const mealFilter = () => {
        return role === "admin" ? {} : { user_id: id };
      };
      const [
        activeUser,
        suspendUser,
        customer,
        provider,
        completeOrder,
        cancelOrder,
        totalMeals,
        totalCategories
      ] = await Promise.all([
        this.db.user.count({ where: userFilter("activate") }),
        this.db.user.count({ where: userFilter("suspend") }),
        this.db.user.count({ where: userFilter(void 0, "customer") }),
        this.db.user.count({ where: userFilter(void 0, "provider") }),
        this.db.order.count({ where: orderFilter(OrderStatus.delivered) }),
        this.db.order.count({ where: orderFilter(OrderStatus.cancelled) }),
        this.db.meal.count({ where: mealFilter() }),
        this.db.categories.count()
      ]);
      return {
        activeUser,
        suspendUser,
        customer,
        provider,
        completeOrder,
        cancelOrder,
        totalMeals,
        totalCategories
      };
    });
  };
};

// src/module/dashboard/dashboard.controller.ts
import httpStatus8 from "http-status-codes";
var DASHBOARD_TTL = 120;
var DashboardController = class {
  dashboardService = new DashboardService();
  getStatic = catchAsync(async (req, res) => {
    const cacheKey = `dashboard:${req.user.role}:${req.user.id}:${req.originalUrl}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return sendResponse(res, {
        statusCode: httpStatus8.OK,
        success: true,
        message: `Retrieve ${req.user.role} Statistics`,
        data: cached
      });
    }
    const result = await this.dashboardService.getStatic(req);
    await cacheSet(cacheKey, result, DASHBOARD_TTL);
    sendResponse(res, {
      statusCode: httpStatus8.OK,
      success: true,
      message: `Retrieve ${req.user.role} Statistics`,
      data: result
    });
  });
};

// src/module/dashboard/dashboard.route.ts
var router7 = express7.Router();
var dashboardController = new DashboardController();
router7.get(
  "/",
  authGuard(),
  dashboardController.getStatic.bind(dashboardController)
);
var dashboard_route_default = router7;

// src/module/embedding/embedding.route.ts
import { Router as Router8 } from "express";

// src/module/embedding/embedding.controller.ts
import httpStatus9 from "http-status-codes";

// src/module/embedding/embedding.service.ts
import { transliterate } from "transliteration";
var EmbeddingService = class {
  apiKey;
  apiUrl = "https://openrouter.ai/api/v1";
  embeddingModel;
  constructor() {
    this.apiKey = config.OPEN_ROUTER.OPEN_ROUTER_API_KEY || "";
    this.embeddingModel = config.OPEN_ROUTER.OPEN_ROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
    if (!this.apiKey) {
      throw new Error("OPEN_ROUTER_API_KEY is not set in .env");
    }
  }
  async generateEmbedding(text) {
    try {
      const normalized = transliterate(text).trim();
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: normalized,
          model: this.embeddingModel
        })
      });
      if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.data || data.data.length === 0) {
        throw new Error("No embedding data returned");
      }
      return data.data[0].embedding;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw error;
    }
  }
};

// src/module/embedding/indexing.service.ts
var toVectorLiteral = (vector) => `[${vector.join(",")}]`;
var IndexingService = class {
  embeddingService;
  constructor() {
    this.embeddingService = new EmbeddingService();
  }
  async getStats() {
    const [totalDocuments, mealDocuments, deletedDocuments] = await Promise.all([
      db.documentEmbedding.count(),
      db.documentEmbedding.count({
        where: {
          sourceType: "MEAL",
          isDelete: false
        }
      }),
      db.documentEmbedding.count({
        where: {
          isDelete: true
        }
      })
    ]);
    return {
      totalDocuments,
      mealDocuments,
      deletedDocuments
    };
  }
  async indexDocument(chunkKey, sourceType, sourceId, content, sourceLabel, metadata) {
    try {
      const embedding = await this.embeddingService.generateEmbedding(content);
      const vectorLiteral = toVectorLiteral(embedding);
      const updatedCount = await db.$executeRaw(prismaNamespace_exports.sql`
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
      await db.$executeRaw(prismaNamespace_exports.sql`
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
  async indexProductsData() {
    try {
      console.log("Fetching products for indexing...");
      const meals = await db.meal.findMany({
        where: {
          is_available: true
        },
        include: {
          category: true,
          reviews: true
        }
      });
      console.log(`Fetched ${meals.length} products. Starting indexing...`);
      let indexedCount = 0;
      for (const meal of meals) {
        const content = `${meal.name} - ${meal.description} Category: ${meal.category.name} Reviews: ${meal.reviews.map((r) => r.comment).join("; ")}`;
        const metadata = {
          name: meal.name,
          description: meal.description,
          category: meal.category.name,
          reviews: meal.reviews.map((r) => ({
            rating: r.rating,
            comment: r.comment
          })),
          price: meal.price
        };
        const chunkKey = `MEAL_${meal.id}`;
        await this.indexDocument(
          chunkKey,
          "MEAL",
          meal.id,
          content,
          meal.name,
          metadata
        );
        indexedCount++;
      }
      console.log(`Successfully indexed ${indexedCount} meals.`);
      return {
        success: true,
        message: `Successfully indexed ${indexedCount} meals.`,
        indexedCount
      };
    } catch (error) {
      console.error("indexProductsData error:", error);
      throw error;
    }
  }
  async similaritySearch(queryEmbedding, limit = 5, threshold = 0.4, sourceType = "MEAL") {
    const vectorLiteral = toVectorLiteral(queryEmbedding);
    const results = await db.$queryRaw(
      prismaNamespace_exports.sql`
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
      `
    );
    return results;
  }
};

// src/module/embedding/embedding.controller.ts
var EmbeddingController = class _EmbeddingController {
  static indexingService = new IndexingService();
  static embeddingService = new EmbeddingService();
  static statsCacheKey = "embedding:stats";
  static statsTtlSeconds = 300;
  static queryTtlSeconds = 120;
  static getStats = catchAsync(async (_req, res) => {
    const cachedStats = await cacheGet(_EmbeddingController.statsCacheKey);
    if (cachedStats) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus9.OK,
        message: "Embedding stats fetched successfully",
        data: cachedStats
      });
    }
    const stats = await _EmbeddingController.indexingService.getStats();
    await cacheSet(
      _EmbeddingController.statsCacheKey,
      stats,
      _EmbeddingController.statsTtlSeconds
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Embedding stats fetched successfully",
      data: stats
    });
  });
  static ingestProducts = catchAsync(async (_req, res) => {
    const result = await _EmbeddingController.indexingService.indexProductsData();
    await cacheDelete(_EmbeddingController.statsCacheKey);
    await cacheDeleteByPattern("embedding:query:*");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: result.message,
      data: result
    });
  });
  static queryRag = catchAsync(async (req, res) => {
    const {
      query,
      limit = 5,
      threshold = 0.4,
      sourceType = "MEAL"
    } = req.body;
    if (!query || !query.trim()) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus9.BAD_REQUEST,
        message: "query is required",
        data: null
      });
    }
    const normalizedQuery = query.trim().toLowerCase();
    const parsedLimit = Number(limit);
    const parsedThreshold = Number(threshold);
    const cacheKey = `embedding:query:${sourceType}:${parsedLimit}:${parsedThreshold}:${normalizedQuery}`;
    const cachedMatches = await cacheGet(cacheKey);
    if (cachedMatches) {
      return sendResponse(res, {
        success: true,
        statusCode: httpStatus9.OK,
        message: "Cached query completed successfully",
        data: {
          query,
          matches: cachedMatches
        }
      });
    }
    const queryEmbedding = await _EmbeddingController.embeddingService.generateEmbedding(query);
    const matches = await _EmbeddingController.indexingService.similaritySearch(
      queryEmbedding,
      parsedLimit,
      parsedThreshold,
      sourceType
    );
    await cacheSet(cacheKey, matches, _EmbeddingController.queryTtlSeconds);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus9.OK,
      message: "Query completed successfully",
      data: {
        query,
        matches
      }
    });
  });
};

// src/module/embedding/embedding.route.ts
var router8 = Router8();
router8.get("/stats", authGuard("admin"), EmbeddingController.getStats);
router8.post(
  "/ingest-product",
  authGuard("admin"),
  EmbeddingController.ingestProducts
);
router8.post("/query", EmbeddingController.queryRag);
var embedding_route_default = router8;

// src/routes/routes.ts
var router9 = express8.Router();
var apiVersion = `/api`;
var moduleRouter = [
  {
    path: `${apiVersion}/admin`,
    route: user_route_default
  },
  {
    path: `${apiVersion}/categories`,
    route: categories_route_default
  },
  {
    path: `${apiVersion}/provider`,
    route: provider_route_default
  },
  {
    path: `${apiVersion}/meal`,
    route: meal_route_default
  },
  {
    path: `${apiVersion}/order`,
    route: order_route_default
  },
  {
    path: `${apiVersion}/review`,
    route: review_route_default
  },
  {
    path: `${apiVersion}/dashboard`,
    route: dashboard_route_default
  },
  {
    path: `${apiVersion}/embedding`,
    route: embedding_route_default
  }
];
moduleRouter.forEach((route) => router9.use(route.path, route.route));
router9.use((req, res) => {
  res.status(httpStatus10.NOT_FOUND).send({
    error: "Not Found",
    message: `${req.originalUrl} - This route is not found`
  });
});
var routes_default = router9;

// src/app.ts
var userService = new UserServices();
var userController2 = new UserController();
var app = express9();
app.use(express9.json());
app.use(express9.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://foodhub-client-eight.vercel.app"
    ],
    credentials: true
  })
);
app.patch(
  "/api/users/profile",
  authGuard(),
  userController2.updateProfile.bind(userController2)
);
app.use("/api/auth/me", authGuard(), async (req, res) => {
  const user = await userService.getUserProfile(req.user.email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus11.OK,
    message: "Profile",
    data: user
  });
});
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.status(httpStatus11.OK).send({
    success: true,
    message: "Hey Baby Programer !!! What's up?",
    time: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.use(routes_default);
var app_default = app;

// src/server.ts
(async () => {
  try {
    await db.$connect();
    app_default.listen(config.PORT, async () => {
      console.log("\u{1F680} DB connected \u{1F680}");
      console.log(`\u{1F680} Server started on http://localhost:${config.PORT} \u{1F680}`);
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : "connection loss";
    console.error("\u274C Server failed to start:", error);
    await db.$disconnect();
    process.exit(1);
  }
})();
//# sourceMappingURL=server.js.map