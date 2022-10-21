import { RequestHandler } from "express";
import { promisify } from "util";
import { verify } from "jsonwebtoken";
import UserRepository from "../repository/user.repository";

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
      const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
      // console.log(decoded);
      if (!decoded) {
        throw new Error("The user is not vaild");
      }
      //3) Checking if the user exsists
      const currentUser = await UserRepository.getUser(decoded._id);

      //4) Checking if the password was changed before the token was issued.
      // console.log(currentUser.compareTimestamps(decoded.iat));
      if (currentUser.compareTimestamps(decoded.iat)) {
        throw new Error("password was changed recently, please login again");
      }
      req.user = currentUser;
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
