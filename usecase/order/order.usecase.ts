import OrderRepository from "../../repository/order.repository";

class OrderUseCase {
  public static getAllOrders = () => {
    return OrderRepository.getAllOrders();
  };
  public static setOrderStatus = (status: any) => {
    return OrderRepository.setOrderStatus(status);
  };
}

export default OrderUseCase;
