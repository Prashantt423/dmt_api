import { RequestHandler } from "express";
import { ProductRepository } from "../repository/product.repository";
import {
  CreateProduct,
  DeleteProduct,
  GetProductById,
} from "../types/product.types";
import { Types } from "mongoose";
import { v4 } from "uuid";
import AWS from "aws-sdk";

export class ProductService {
  public static createProduct: CreateProduct = async (product) => {
    try {
      return await ProductRepository.createProduct(product);
    } catch (e) {
      console.log(e);
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
  public static getMultipleProduct: RequestHandler = async (req, res, next) => {
    try {
      const data = await ProductRepository.getMultipleProductById(
        req.body.products
      );
      res.status(200).json({
        data,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  public static generatePresignedUrl: RequestHandler = async (
    req,
    res,
    next
  ) => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        // endPoint: "donation-program.s3-accelerate.amazonaws.com",
        signatureVersion: "v4",
        region: "ap-south-1",
      });

      const id = v4();
      const params = {
        Bucket: "dmt-storage-v1",
        Key: `images/${id} `,
        Expires: 60 * 10,
        // ACL: "public-read",
      };

      const url = await s3.getSignedUrl("putObject", params);
      const downloadAbleUrl = `https://dmt-storage-v1.s3.ap-south-1.amazonaws.com/images/${id}+`;
      res.status(200).json({
        status: "success",
        url,
        downloadAbleUrl,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "failed",
      });
    }
  };
  public static getReleases: RequestHandler = async (req, res, next) => {
    try {
      console.log("working");
      const data = await ProductRepository.getAllReleases();
      console.log(data);
      if (!data.success) {
        throw new Error("something went wrong");
      }
      res.status(200).json({
        data: data.data,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}
