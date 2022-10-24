import { Request, Response, NextFunction } from "express";
import { authRouter } from "./auth.routes";
import { productRouter } from "../controller/product.routes";
// const productRoutes = require("./product.routes");
import { Router } from "express";
import userRouter from "./user.routes";
import { default as paymentRouter } from "../controller/payment.routes";
const router = Router();

router.get(
  "/readiness",
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.send({ message: "Server is Up!!!" });
    } catch (e) {
      next(e);
    }
  }
);

router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/payment", paymentRouter);
module.exports = router;
