import { RequestHandler } from "express";
import { UserType } from "../types/user.types";
import UserRepository from "../repository/user.repository";
import UserUsecase from "../usecase/user/jwt.usecase";
class UserServices {
  public static signup: RequestHandler = async (req, res, next) => {
    try {
      const user: UserType = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        ip: req.body.ip,
        dateOfBirth: new Date(req.body.dateOfBirth),
        passwordChangedAt: Date.now(),
      };
      const newUser = await UserRepository.signUp(user);
      console.log(newUser);
      const token = UserUsecase.generateToken(newUser.data._id);

      res.status(201).json({
        messgae: "success",
        newUser,
        token,
      });
    } catch (e) {
      next(e);
    }
  };
  public static login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.logIn(email, password);
      const token = UserUsecase.generateToken(user.data._id);
      res.status(200).json({
        user,
        token,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default UserServices;
