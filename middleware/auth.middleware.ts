import { RequestHandler } from "express";
import { promisify } from "util";
import { verify } from "jsonwebtoken";
import UserRepository from "../repository/user.repository";
import { decode, TAlgorithm } from "jwt-simple";
import { Types } from "mongoose";
import UserUsecase from "../usecase/user/user.usecase";

class AuthMiddleWare {
  public static authorization: RequestHandler = async (req, res, next) => {
    try {
      // 1) Checking if the token is present insdie the header
      let token = "";
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        throw new Error("You should login first");
      }
      //2) Validating the token
      const decoded = decode(token, process.env.JWT_SECRET, false);
      console.log(decoded);
      if (!decoded) {
        throw new Error("The token is not vaild");
      }
      //3) Checking if the user exsists

      const currentUser = await UserRepository.getUser(decoded.id);
      if (!currentUser.success) {
        throw new Error("User does not exist");
      }

      // 4) Checking if the password was changed before the token was issued.

      if (
        UserUsecase.compareTimeStamps(
          decoded.iat,
          currentUser.data.passwordChangedAt
        )
      ) {
        throw new Error("Password was recently changed, please login again");
      }
      req.user = currentUser.data;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        status: "failed",
        message: err,
      });
    }
  };
}

export default AuthMiddleWare;
