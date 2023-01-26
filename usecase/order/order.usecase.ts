import { RequestHandler } from "express";
import OrderRepository from "../../repository/order.repository";

class OrderUseCase {
  public static getAllOrders = () => {
    return OrderRepository.getAllOrders();
  };
  public static setOrderStatus = (status: any) => {
    return OrderRepository.setOrderStatus(status);
  };
  public static getAllOrdersByUserId: RequestHandler = async (
    req,
    res,
    next
  ) => {
    try {
      const data = await OrderRepository.getOrdersOfUser(req.query.email);
      res.status(201).json({
        data: data.data,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default OrderUseCase;
