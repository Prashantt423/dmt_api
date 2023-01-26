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
  public static getAllOrders = async () => {
    try {
      const AllOrders = await orderModel.find({});
      return {
        data: AllOrders,
        status: 200,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        status: 404,
        success: false,
      };
    }
  };
  public static setOrderStatus = async (body: any) => {
    try {
      const AllOrders = await orderModel.updateOne(
        { id: body.id },
        {
          $push: {
            updates: {
              time: Date.now(),
              type: body.type,
            },
          },
        }
      );
      return {
        data: AllOrders,
        status: 200,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        status: 404,
        success: false,
      };
    }
  };
  public static getOrdersOfUser = async (email: any) => {
    try {
      const AllOrders = await orderModel.find({ customer: email });
      return {
        data: AllOrders,
        status: 200,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        status: 404,
        success: false,
      };
    }
  };
}

export default OrderRepository;
