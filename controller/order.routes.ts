import { Router } from "express";
import OrderUseCase from "../usecase/order/order.usecase";
import { Request, Response, NextFunction, RequestHandler } from "express";
import AuthMiddleWare from "../middleware/auth.middleware";
const router = Router();

router.get(
  "/",
  // AuthMiddleWare.IsAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const orders = await OrderUseCase.getAllOrders();
      res.status(orders.status).json(orders);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

// get order by user id
router.get("/", OrderUseCase.getAllOrdersByUserId);
router.post(
  "/",
  // AuthMiddleWare.IsAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const order = await OrderUseCase.setOrderStatus(req.body);
      res.status(order.status).json(order);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

export default router;
