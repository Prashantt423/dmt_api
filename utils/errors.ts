import {  Request, Response,NextFunction } from 'express';
import {CustomError} from '../utils/customError';
// eslint-disable-next-line no-unused-vars
const errorHandler = () => (error:CustomError, req:Request, res:Response, _next:NextFunction) => {
    console.log(error);

    if (error.statusCode && error.statusCode != 500) {
      console.error({
        err: {
          message: error.message,
        },
      });
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    // check for 500 error
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'INTERNAL SERVER ERROR',
    });
  };
  
  module.exports = errorHandler;
  