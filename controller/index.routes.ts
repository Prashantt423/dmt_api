import { Request, Response, NextFunction } from "express";
import { authRouter } from "./auth.routes";
import { productRouter } from "../controller/product.routes";
// const productRoutes = require("./product.routes");
import { Router } from "express";
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
router.use("/user", authRouter);

module.exports = router;
