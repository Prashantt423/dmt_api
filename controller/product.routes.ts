import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";
import { ProductUseCase } from "../usecase/product/product.usecase";
import { ProductService } from "../service/product.service";
import AuthMiddleWare from "../middleware/auth.middleware";

const express = require("express");
const productRouter: Router = express.Router();

productRouter.post(
  "/create",
  AuthMiddleWare.IsAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const productObj = await ProductService.createProduct(req.body);
      res.status(productObj.status).json(productObj);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

productRouter.delete(
  "/delete",
  AuthMiddleWare.IsAdmin,
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
productRouter.get(
  "/generate_presigned_url",
  AuthMiddleWare.authorization,
  ProductService.generatePresignedUrl
);

productRouter.get(
  "/get_releases",
  AuthMiddleWare.authorization,
  ProductService.getReleases
);
productRouter.get("/:id", ProductService.getSingleProduct);
productRouter.post("/list", ProductService.getMultipleProduct);

export { productRouter };
