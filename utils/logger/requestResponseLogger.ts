const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
var httpContext = require('express-http-context');
import * as dotenv from 'dotenv';
dotenv.config();
const REQUEST_RESPONSE_LOG_PATH = process.env.REQUEST_RESPONSE_LOG_PATH;;
console.log(`Request Response Logs are stored at location: ${REQUEST_RESPONSE_LOG_PATH}`);

const transports = [
  new winston.transports.File({
    filename: REQUEST_RESPONSE_LOG_PATH,
    level: 'info',
    format: ecsFormat(),
  }),
];

const logger = winston.createLogger({ transports });

const logUtils = {
  serviceName: 'dmt_api',
  timestamp: new Date(),
};

const getUserDetails = () => {
  const user = httpContext.get('user');
  return {
    email: user?.email,
    userMongooseId: user?._id,
  };
};

 
const logRequest = (req :any) => {
  const logObj :any = {
    ...logUtils,
    ...getUserDetails(),
    requestId: httpContext.get('requestId'),
    endpoint: req?.route?.path,
    originalUrl: req?.originalUrl,
    body: req?.body,
    headers: req?.headers,
    method: req?.method,
    params: req?.params,
    query: req?.query,
    message: `Request ${req.method} on ${req.originalUrl}`,
  };
  logger.info(logObj);
};

const logResponse = (data:any) => {
  const logObj = {
    ...logUtils,
    ...getUserDetails(),
    requestId: httpContext.get('requestId'),
    body: data,
    headers: data?.headers,
    message: data?.message,
  };
  logger.info(logObj);
};

const responseLoggerMiddleware = (res:any) => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks :any[] = [];

  res.write = (...restArgs:any[]) => {
    chunks.push(Buffer.from(restArgs[0]));
    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs:any[]) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }
    const body = Buffer.concat(chunks).toString('utf8');

    logResponse({
      headers: res.getHeaders(),
      data: body,
      message: 'Request Finished',
    });

    // console.log(body);
    oldEnd.apply(res, restArgs);
  };
};

module.exports = {
  logRequest,
  logResponse,
  responseLoggerMiddleware,
};
