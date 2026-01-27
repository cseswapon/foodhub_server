import { db as database } from "@/db";
import { Prisma } from "@/db/generated/client";
import { UserRole, UserStatus } from "@/db/generated/enums";
import { getPagination } from "@/utils/pagination";
import { Request } from "express";

interface IUserStatus {
  status: UserStatus;
  role: UserRole;
}
interface IUserProfileUpdate {
  name?: string;
  phone?: string;
  address?: string;
}

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

  async updateStatusRole(id: string, data: Partial<IUserStatus>) {
    const updateData: Partial<IUserStatus> = {};

    if (data.role === "admin") {
      throw Error("Change no role");
    }

    if (data.role !== undefined) {
      updateData.role = data.role;
    }
    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }

    const user = await this.db.user.update({
      where: {
        id: id as string,
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        status: true,
        role: true,
      },
    });

    return user;
  }

  async updateProfile(userId: string,data: Prisma.UserUpdateInput) {
    if (data.role || data.emailVerified || data.status) {
      return "This payload not supported"
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
        updatedAt: true,
      },
    });
    return updateUser;
  }
}
