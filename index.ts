import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import path from "path";
import { connect } from "mongoose";
import { CustomError } from "./utils/customError";
const morganBody = require("morgan-body");
const handleErrors = require("./utils/errors");
const httpContext = require("express-http-context");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  responseLoggerMiddleware,
  logRequest,
} = require("./utils/logger/requestResponseLogger");
const indexRoutes = require("./controller/index.routes");
dotenv.config({ path: "./.env" });
const app: express.Application = express();
const port = process.env.PORT || 3001;

//connection to db
connect(process.env.MONGO_URL);
// middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Request logger
morganBody(app);
process.env.SRC_PATH = path.resolve(__dirname);

// Setup Mongoose connection
require("./config/db")(process.env.MONGO_URL);
// require("./dummyData");

// order matters
app.use(httpContext.middleware);

app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  req.headers["x-request-id"] = requestId;
  res.setHeader("x-request-id", requestId);
  httpContext.set("requestId", requestId);
  logRequest(req);
  responseLoggerMiddleware(res);
  next();
});

//Load all routes
app.use("/api", indexRoutes);

// All undefined routes should throw 404
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(404, "not found");
  next(error);
});

//Global Error handler
app.use(handleErrors);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
