import {  Request, Response,NextFunction } from 'express';
const productRoutes = require("./product.routes")
const express = require('express');
const router = express.Router();


router.get("/readiness", (req:Request, res:Response, next:NextFunction):void => {
  try {
    res.send({ message: 'Server is Up!!!' });
  } catch (e) {
    next(e);
  }
});

router.use("/product",productRoutes);

module.exports = router;
