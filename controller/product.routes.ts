import {  Request, Response,NextFunction } from 'express';
import { ProductUseCase } from '../usecase/product/product.usecase';
const express = require('express');
const router = express.Router();


router.post("/create",async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  try {
    const productObj =  await ProductUseCase.createProduct(req.body);
    // console.log(productObj)
    res.status(productObj.status).json(productObj);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
