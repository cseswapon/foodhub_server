import { db as Database } from "../../db";
import {
  Order_Item,
  OrderStatus,
  PaymentMethod,
  Prisma,
} from "../../db/generated/client";
import { Request } from "express";
import { getPagination } from "../../utils/pagination";

interface OrderItemInput {
  meal_id: string;
  quantity: number;
  price: number;
}

export class OrderService {
  private readonly db = Database;

  getOrder = async (req: Request) => {
    const status = req.query.status as string;

    const where: Prisma.OrderWhereInput = {};

    if (
      status &&
      Object.values(OrderStatus).includes(status.toLowerCase() as OrderStatus)
    ) {
      where.status = status.toLowerCase() as OrderStatus;
    }

    // customer → own orders
    if (req.user.role === "customer") {
      where.user_id = req.user.id as string;
    }

    // provider → orders for provider whose user_id = req.user.id
    /* if (req.user.role === "provider") {
      where.provider = {
        user_id: req.user.id as string,
      };
    } */

    const total = await this.db.order.count({ where });
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);

    const orders = await this.db.order.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        created_at: "desc",
      },
      include: {
        // provider: {
        //   select: {
        //     id: true,
        //     user_id: true,
        //     restaurant_name: true,
        //     address: true,
        //     is_open: true,
        //   },
        // },
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

  getOrderMeal = async (req: Request) => {
    const orders = await this.db.order_Item.findMany({
      where: {
        order: {
          user_id: req.user.id as string,
        },
      },
      include: {
        meal: {
          select: {
            name: true,
          },
        },
        order: {
          select: {
            user_id: true,
          },
        },
      },
    });

    return {
      orders,
    };
  };

  getIdOrder = async (id: string) => {
    const order = await this.db.order.findFirst({
      where: {
        id,
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
                price: true,
              },
            },
          },
        },
      },
    });
    return order;
  };

  createOrder = async (req: Request) => {
    const userId = req.user.id as string;

    const {
      delivery_address,
      payment_method,
      items,
    }: {
      delivery_address: string;
      payment_method: PaymentMethod;
      items: OrderItemInput[];
    } = req.body;

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

  updateOrder = async (
    id: string,
    data: Prisma.OrderUpdateInput,
    role: "customer" | "provider" | "admin",
    userId: string,
  ) => {
    console.log(id, data, role);
    const order = await this.db.order.findUnique({
      where: { id },
      include: {
        // provider: {
        //   select: {
        //     user_id: true,
        //   },
        // },
      },
    });
    // console.log(order);
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
        throw new Error("Order can’t be cancelled at this stage");
      }

      if (order.user_id !== userId) {
        throw new Error("Unauthorized order access");
      }
    }
    // console.log(role);
    if (role === "provider") {
      if (
        !["ready", "preparing", "delivered", "cancelled"].includes(
          data.status as string,
        )
      ) {
        throw new Error("Invalid status update by provider");
      }

      /*  if (order.provider.user_id !== userId) {
        throw new Error("Unauthorized provider access");
      } */
    }
    return this.db.order.update({
      where: { id },
      data: {
        ...data,
        cancelled_by: data.status === "cancelled" ? role : null,
      },
    });
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
