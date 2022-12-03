import { OrderCreate, OrderReturnType } from "../types/order.types";
import orderModel from "../model/order.model";

class OrderRepository {
  public static createOrders: OrderCreate = async (orders) => {
    try {
      const createdObjects = await orderModel.create(orders);
      return {
        data: createdObjects,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        success: false,
      };
    }
  };
}

export default OrderRepository;
