import {  Request, Response,NextFunction } from 'express';
const express = require('express');
const router = express.Router();


router.get("/readiness", (req:Request, res:Response, next:NextFunction):void => {
  try {
    res.send({ message: 'Server is Up!!!' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
