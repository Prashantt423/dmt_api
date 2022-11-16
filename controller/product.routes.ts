import { Request, Response, NextFunction, RequestHandler } from "express";
import { ProductUseCase } from "../usecase/product/product.usecase";
import { ProductService } from "../service/product.service";

const express = require("express");
const productRouter = express.Router();

productRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const productObj = await ProductService.createProduct(req.body);
      res.status(productObj.status).json(productObj);
    } catch (e) {
      next(e);
    }
  }
);

productRouter.delete(
  "/delete",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const deletedProductObj = await ProductService.deleteProduct(req.body.id);

      res.status(deletedProductObj.status).json(deletedProductObj);
    } catch (e) {
      next(e);
    }
  }
);

// /product?isFirst=1&limit=n -> next page and data
productRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const foundProducts = await ProductUseCase.getProduct(req.query);
      res.status(foundProducts.status).json(foundProducts);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

// /search, req.body={tags:["q1","q2"]}
productRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const foundProducts = await ProductUseCase.getSearchedProducts(req.body);
      res.status(foundProducts.status).json(foundProducts);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);
// /search, req.body={tags:["q1","q2"]}
productRouter.get(
  "/albums",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const foundProducts = await ProductUseCase.getAlbums(req.query.limit);
      res.status(foundProducts.status).json(foundProducts);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

export { productRouter };
