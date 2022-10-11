import {  Request, Response,NextFunction } from 'express';
const express = require('express');
const router = express.Router();


router.get("/read", (req:Request, res:Response, next:NextFunction):void => {
  try {
    res.send({ message: 'Hi there' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
