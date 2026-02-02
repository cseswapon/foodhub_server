// src/app.ts
import express9 from "express";
import httpStatus10 from "http-status-codes";
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
  BACKEND_URL: process.env.BACKEND_URL,
  APP_URL: process.env.APP_URL,
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
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Categories {\n  id   String @id @default(uuid())\n  name String @unique()\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  meals Meal[]\n\n  @@map("categories")\n}\n\nenum UserRole {\n  customer\n  provider\n  admin\n}\n\nenum UserStatus {\n  activate\n  suspend\n}\n\nenum DietaryType {\n  veg\n  non_veg\n  vegan\n}\n\nenum PaymentMethod {\n  cod\n  online\n}\n\nenum OrderStatus {\n  placed\n  preparing\n  ready\n  delivered\n  cancelled\n}\n\nmodel Meal {\n  id String @id @default(uuid())\n\n  provider_id String\n  provider    Provider @relation(fields: [provider_id], references: [id], onDelete: Cascade)\n\n  category_id String\n  category    Categories @relation(fields: [category_id], references: [id], onDelete: Cascade)\n\n  name         String\n  description  String\n  price        Decimal     @db.Decimal(10, 2)\n  dietary_type DietaryType\n  is_available Boolean     @default(true)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  orderItems Order_Item[]\n  reviews    Review[]\n\n  @@index([dietary_type])\n  @@index([name])\n  @@index([price])\n  @@map("meals")\n}\n\nmodel Order {\n  id      String @id @default(uuid())\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id])\n\n  provider_id String\n  provider    Provider @relation(fields: [provider_id], references: [id], onDelete: Cascade)\n\n  total_price      Decimal       @db.Decimal(10, 2)\n  delivery_address String\n  payment_method   PaymentMethod\n\n  status       OrderStatus\n  cancelled_by String?\n\n  created_at DateTime     @default(now())\n  updated_at DateTime     @updatedAt()\n  orderItems Order_Item[]\n\n  @@index([status])\n  @@map("orders")\n}\n\nmodel Order_Item {\n  id      String @id @default(uuid())\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id])\n\n  meal_id String\n  meal    Meal   @relation(fields: [meal_id], references: [id])\n\n  quantity Int\n  price    Decimal @db.Decimal(10, 2)\n\n  @@map("order_items")\n}\n\nmodel Provider {\n  id String @id @default(uuid())\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id], onDelete: Cascade)\n\n  restaurant_name String  @unique()\n  description     String\n  address         String\n  is_open         Boolean @default(true)\n\n  fb_link String\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  meals  Meal[]\n  orders Order[]\n\n  @@map("providers")\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  meal_id String\n  meal    Meal   @relation(fields: [meal_id], references: [id])\n\n  rating Decimal @db.Decimal(10, 1)\n\n  comment String?\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id])\n\n  is_visible Boolean @default(true)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  @@map("reviews")\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          UserRole   @default(customer)\n  phone         String\n  address       String?\n  status        UserStatus @default(activate)\n  sessions      Session[]\n  accounts      Account[]\n  provider      Provider[]\n  orders        Order[]\n  reviews       Review[]\n\n  @@unique([email])\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoriesToMeal"}],"dbName":"categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"Provider","relationName":"MealToProvider"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMeal"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"dietary_type","kind":"enum","type":"DietaryType"},{"name":"is_available","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"Order_Item","relationName":"MealToOrder_Item"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":"meals"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"Provider","relationName":"OrderToProvider"},{"name":"total_price","kind":"scalar","type":"Decimal"},{"name":"delivery_address","kind":"scalar","type":"String"},{"name":"payment_method","kind":"enum","type":"PaymentMethod"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"cancelled_by","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"Order_Item","relationName":"OrderToOrder_Item"}],"dbName":"orders"},"Order_Item":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrder_Item"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrder_Item"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"}],"dbName":"order_items"},"Provider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderToUser"},{"name":"restaurant_name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"is_open","kind":"scalar","type":"Boolean"},{"name":"fb_link","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProvider"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProvider"}],"dbName":"providers"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"rating","kind":"scalar","type":"Decimal"},{"name":"comment","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"is_visible","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"provider","kind":"object","type":"Provider","relationName":"ProviderToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
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
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
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
import { config as config3 } from "dotenv";
config3();
var auth = betterAuth({
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
    "https://foodhub-client-eight.vercel.app"
  ],
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
import httpStatus9 from "http-status-codes";

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
var CategoriesController = class {
  categoriesService = new CategoriesService();
  getAllCategories = catchAsync(
    async (req, res, next) => {
      const result = await this.categoriesService.getCategories(req);
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
      const result = await this.categoriesService.getIdCategories(id);
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
    const providers = await this.db.provider.findMany({
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
    const provider = await this.db.provider.findUnique({
      where: {
        id
      },
      include: {
        meals: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true
          }
        }
      }
    });
    return provider;
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
      const provider = await t.provider.findUnique({
        where: { id }
      });
      if (!provider) {
        throw new Error("Provider not found");
      }
      await t.provider.delete({
        where: { id }
      });
      return { message: "Successfully deleted" };
    });
  };
};

// src/module/provider/provider.controller.ts
var ProvidersController = class {
  providerService = new ProviderService();
  getAllProviders = catchAsync(
    async (req, res, next) => {
      const result = await this.providerService.getProvider(req);
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
      const result = await this.providerService.getProviderme(req);
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
      const result = await this.providerService.getIdProvider(
        req.params.id
      );
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
        provider: {
          user_id: req.user.id
        }
      }
    });
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const meals = await this.db.meal.findMany({
      where: {
        provider: {
          user_id: req.user.id
        }
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
        provider: true,
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
        provider: true,
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
var MealsController = class {
  providerService = new MealService();
  getAllMeals = catchAsync(
    async (req, res, next) => {
      const result = await this.providerService.getMeal(req);
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
      const result = await this.providerService.getMealme(req);
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
      const result = await this.providerService.getIdMeal(id);
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
      const result = await this.providerService.getSingleMealProvider(
        id
      );
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
      where.provider = {
        user_id: req.user.id
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
        provider: {
          select: {
            id: true,
            user_id: true,
            restaurant_name: true,
            address: true,
            is_open: true
          }
        },
        orderItems: {
          include: {
            meal: {
              select: {
                name: true,
                price: true
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
        provider: true,
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
      provider_id,
      delivery_address,
      payment_method,
      items
    } = req.body;
    const providerExists = await this.db.provider.findUnique({
      where: { id: provider_id }
    });
    if (!providerExists) throw new Error("Provider not found");
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
        provider: { connect: { id: provider_id } },
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
        provider: {
          select: {
            user_id: true
          }
        }
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
      if (order.provider.user_id !== userId) {
        throw new Error("Unauthorized provider access");
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
var OrdersController = class {
  providerService = new OrderService();
  getAllOrders = catchAsync(
    async (req, res, next) => {
      const result = await this.providerService.getOrder(req);
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
      const result = await this.providerService.getOrderMeal(req);
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
      const result = await this.providerService.getIdOrder(id);
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
var ReviewsController = class {
  reviewService = new ReviewService();
  getAllReviews = catchAsync(
    async (req, res, next) => {
      const result = await this.reviewService.getReview(req);
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
    const result = await this.reviewService.getIdReview(
      id,
      req.user.id,
      req.user.role
    );
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
        return role === "admin" ? {} : { provider_id: id };
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
var DashboardController = class {
  dashboardService = new DashboardService();
  getStatic = catchAsync(async (req, res) => {
    const result = await this.dashboardService.getStatic(req);
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

// src/routes/routes.ts
var router8 = express8.Router();
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
  }
];
moduleRouter.forEach((route) => router8.use(route.path, route.route));
router8.use((req, res) => {
  res.status(httpStatus9.NOT_FOUND).send({
    error: "Not Found",
    message: `${req.originalUrl} - This route is not found`
  });
});
var routes_default = router8;

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
    statusCode: httpStatus10.OK,
    message: "Profile",
    data: user
  });
});
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.status(httpStatus10.OK).send({
    success: true,
    message: "Hey Baby Programer !!! What's up ?",
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