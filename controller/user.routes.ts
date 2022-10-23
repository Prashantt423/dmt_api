import { Router } from "express";
import UserServices from "../services/user.service";
import AuthMiddleWare from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post(
  "/add-product-to-cart",
  AuthMiddleWare.authorization,
  UserServices.addToCart
);
userRouter.post(
  "/remove-product-from-cart",
  AuthMiddleWare.authorization,
  UserServices.removeFromCart
);

export default userRouter;
