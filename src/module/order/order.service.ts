import { db as Database } from "@/db";
import { Order_Item, PaymentMethod, Prisma } from "@/db/generated/client";
import { getPagination } from "@/utils/pagination";
import { Request } from "express";

interface OrderItemInput {
  meal_id: string;
  quantity: number;
  price: number;
}

export class OrderService {
  private readonly db = Database;

  getOrder = async (req: Request) => {
    const status = req.query.status as string | undefined;

    let where: Record<string, any> = {};
    if (status) where.status = status.toUpperCase();

    if (req.user.role === "customer") {
      where.user_id = req.user.id;
    } else if (req.user.role === "provider") {
      where.provider_id = req.user?.id;
    }

    const total = await this.db.order.count({ where });
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const orders = await this.db.order.findMany({
      where,
      take: limit,
      skip: skip,
      orderBy: {
        created_at: "desc",
      },
      include: {
        orderItems: {
          include: {
            meal: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      orders,
      meta: {
        total,
        total_page,
        current_page: page,
        limit,
        skip,
      },
    };
  };

  getIdOrder = async (id: string) => {
    const order = await this.db.order.findFirst({
      where: {
        id,
      },
    });
    return order;
  };

  createOrder = async (req: Request) => {
    const userId = req.user.id as string;

    const {
      provider_id,
      delivery_address,
      payment_method,
      items,
    }: {
      provider_id: string;
      delivery_address: string;
      payment_method: PaymentMethod;
      items: OrderItemInput[];
    } = req.body;

    const providerExists = await this.db.provider.findUnique({
      where: { id: provider_id },
    });
    if (!providerExists) throw new Error("Provider not found");

    for (const item of items) {
      const mealExists = await this.db.meal.findUnique({
        where: { id: item.meal_id },
      });
      if (!mealExists) throw new Error(`Meal not found: ${item.meal_id}`);
    }

    const total_price = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
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
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    return result;
  };

  updateOrder = async (id: string,data: Prisma.OrderUpdateInput) => {
    const order = await this.db.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new Error("Order not found");
    }
    const orders = await this.db.order.update({
      where: {
        id,
      },
      data,
    });
    return orders;
  };

  deleteOrder = async (id: string) => {
    return this.db.$transaction(async (t) => {
      const order = await t.order.findUnique({
        where: { id },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      await t.order.delete({
        where: { id },
      });

      return { message: "Successfully deleted" };
    });
  };
}
