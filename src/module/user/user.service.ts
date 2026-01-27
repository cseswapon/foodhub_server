import { db as database } from "@/db";
import { UserStatus } from "@/db/generated/enums";
import { getPagination } from "@/utils/pagination";
import { Request } from "express";

export class UserServices {
  private db;
  constructor() {
    this.db = database;
  }
  async getUserProfile(email: string) {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async getUsers(req: Request) {
    const total = await this.db.user.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const users = await this.db.user.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      users,
      meta: {
        total,
        total_page,
        page,
        limit,
        skip,
      },
    };
  }

  async updateStatus(id: string, status: UserStatus) {
    const user = await this.db.user.update({
      where: {
        id: id as string,
      },
      data: {
        status: status,
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    return user;
  }
}
