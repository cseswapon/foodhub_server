import { db as Database } from "../../db";
import { Request } from "express";
import { OrderStatus, UserRole } from "../../db/generated/enums";

export class DashboardService {
  private readonly db = Database;

  getStatic = async (req: Request) => {
    const { role, id } = req.user as { role: UserRole; id: string };

    return this.db.$transaction(async (t) => {

      const userFilter = (
        status?: "activate" | "suspend",
        userRole?: UserRole,
      ) => {
        const filter: any = {};
        if (status) filter.status = status;
        if (userRole) filter.role = userRole;
        if (role !== "admin") filter.id = id;
        return filter;
      };

    
      const orderFilter = (status: OrderStatus) => {
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
        totalCategories,
      ] = await Promise.all([
        this.db.user.count({ where: userFilter("activate") }),
        this.db.user.count({ where: userFilter("suspend") }),
        this.db.user.count({ where: userFilter(undefined, "customer") }),
        this.db.user.count({ where: userFilter(undefined, "provider") }),
        this.db.order.count({ where: orderFilter(OrderStatus.delivered) }),
        this.db.order.count({ where: orderFilter(OrderStatus.cancelled) }),
        this.db.meal.count({ where: mealFilter() }),
        this.db.categories.count(),
      ]);

      return {
        activeUser,
        suspendUser,
        customer,
        provider,
        completeOrder,
        cancelOrder,
        totalMeals,
        totalCategories,
      };
    });
  };
}
