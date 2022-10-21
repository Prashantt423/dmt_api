import { Request, Response, NextFunction } from "express";
// const express = require("express");
import { Router } from "express";
const productRouter = Router();

productRouter.get(
  "/read",
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.send({ message: "Hi there" });
    } catch (e) {
      next(e);
    }
  }
);

export { productRouter };
