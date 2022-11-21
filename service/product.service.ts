import { RequestHandler } from "express";
import { ProductRepository } from "../repository/product.repository";
import {
  CreateProduct,
  DeleteProduct,
  GetProductById,
} from "../types/product.types";
import { Types } from "mongoose";

export class ProductService {
  public static createProduct: CreateProduct = async (product) => {
    try {
      return await ProductRepository.createProduct(product);
    } catch (e) {
      return {
        data: e,
        success: false,
        status: 500,
      };
    }
  };
  public static deleteProduct: DeleteProduct = async (productId) => {
    try {
      return await ProductRepository.deleteProduct(productId);
    } catch (e) {
      return {
        data: e,
        success: false,
        status: 500,
      };
    }
  };

  public static getSingleProduct: RequestHandler = async (req, res, next) => {
    try {
      const data = await ProductRepository.getSingleProductById(req.params.id);
      res.status(200).json({
        data,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  // public static getMultipleProducts: RequestHandler = async (
  //   req,
  //   res,
  //   next
  // ) => {
  //   try {
  //     const user = req.user;
  //     if (!user) {
  //       throw new Error("No user found");
  //     }
  //     const ids = user.cart.map((el) => {
  //       return new Types.ObjectId(el.product);
  //     });
  //     console.log(ids);
  //     const { data } = await ProductRepository.getMultipleProductsById(ids);
  //     // console.log(data);
  //     // if (!data.sucess) {
  //     //   throw new Error("Something went wrong");
  //     // }
  //     res.status(200).json({
  //       data,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     next(e);
  //   }
  // };
}
