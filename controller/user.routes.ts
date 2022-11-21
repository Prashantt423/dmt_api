import { Router } from "express";
import UserServices from "../service/user.service";
import AuthMiddleWare from "../middleware/auth.middleware";
import { ProductService } from "../service/product.service";

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
// userRouter.post(
//   "/get-products",
//   AuthMiddleWare.authorization,
//   ProductService.getMultipleProducts
// );

export default userRouter;
