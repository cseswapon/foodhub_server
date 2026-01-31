import { db as Database } from "../../db";
import { Prisma, Provider } from "../../db/generated/client";
import { Request } from "express";
import { getPagination } from "../../utils/pagination";

export class ProviderService {
  private readonly db = Database;

  getProvider = async (req: Request) => {
    const total = await this.db.provider.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const providers = await this.db.provider.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        created_at: "asc",
      },
    });

    return {
      providers,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip,
      },
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

  getProviderme = async (req: Request) => {
    const total = await this.db.provider.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const providers = await this.db.provider.findMany({
      where: {
        user_id: req.user.id as string,
      },
      take: limit,
      skip: skip,
      orderBy: {
        created_at: "asc",
      },
    });

    return {
      providers,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip,
      },
    };
  };

  getIdProvider = async (id: string) => {
    const provider = await this.db.provider.findUnique({
      where: {
        id,
      },
      include: {
        meals:true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true,
          },
        },
      },
    });
    return provider;
  };

  createProvider = async (
    data: Omit<Prisma.ProviderCreateInput, "user">,
    userId: string,
  ) => {
    // console.log({...data,userId});
    const result = await this.db.provider.create({
      data: {
        ...data,
        user_id: userId,
        //   user: {
        //     connect: {
        //       id: userId
        //     }
        //   }
      },
    });
    return result;
  };

  updateProvider = async (id: string, data: any, name: string) => {
    console.log("id=>", id, "data=>", data);
    const providers = await this.db.provider.update({
      where: {
        user_id: id as string,
        restaurant_name: name,
      },
      data,
    });
    return providers;
  };

  deleteProvider = async (id: string) => {
    return this.db.$transaction(async (t) => {
      const provider = await t.provider.findUnique({
        where: { id },
      });

      if (!provider) {
        throw new Error("Provider not found");
      }

      await t.provider.delete({
        where: { id },
      });

      return { message: "Successfully deleted" };
    });
  };
}
