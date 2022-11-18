import { RequestHandler } from "express";
import { UserType } from "../types/user.types";
import UserRepository from "../repository/user.repository";
import UserUsecase from "../usecase/user/user.usecase";
import verifyEmailTamplate from "../templates/verifyEmailTemplate";
import NotificationsUtil from "../utils/notifications";
import MailService from "../utils/notifications";
import Crypto from "../utils/crypto";
class UserServices {
  public static signup: RequestHandler = async (req, res, next) => {
    try {
      const doEmailExist = await UserRepository.doEmailExist(req.body?.email);

      if (doEmailExist?.error)
        res.status(500).json({
          message: "Internal server errror!",
        });
      if (doEmailExist?.isPresent)
        res.status(401).json({
          message: "This email already exists!",
        });

      // send (hashed email of user) to email for verification
      const token = Crypto.encrypt(req.body?.email);
      const verifyLink = `${process.env.CLIENT_SERVER}verify/${token}`;

      const emailTemplate = verifyEmailTamplate(verifyLink);
      const mailService = await MailService.sendEmailUtilLive(9000, {
        to: req.body?.email,
        subject: "Verify OTP",
        html: emailTemplate.html,
      });
      console.log(mailService);
      const user: any = {
        name: req.body?.name,
        email: req.body?.email,
        password: req.body?.password,
        confirmPassword: req.body?.confirmPassword,
        ip: req.body?.ip,
        dateOfBirth: new Date(req.body?.dateOfBirth),
        passwordChangedAt: Date.now(),
      };
      const newUser = await UserRepository.signUp(user);
      console.log(newUser);

      res.status(201).json({
        messgae: "success",
        newUser,
      });
    } catch (e) {
      next(e);
    }
  };
  public static login: RequestHandler = async (req, res, next) => {
    try {
      console.log(req.user);
      const { email, password } = req.body;
      const user = await UserRepository.logIn(email, password);
      if (!user.success) {
        res.status(user.code).json(user.data);
      }
      if (user.success && user.code === 200) {
        const token = UserUsecase.generateToken(user.data._id);
        res.status(200).json({
          ...user,
          token,
        });
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  public static verify: RequestHandler = async (req, res, next) => {
    try {
      const token = String(req.query.token);
      console.log(token);
      const email = Crypto.decrypt(token);
      const doEmailExist = await UserRepository.doEmailExist(email);
      if (doEmailExist?.error)
        res.status(500).json({
          message: "Internal server errror!",
        });
      if (doEmailExist?.isPresent)
        res.status(401).json({
          message: "This email already exists!",
        });
      // make user isVerify true
      const updatedUser = await UserRepository.updateStatus(email);
      if (updatedUser.error) {
        res.status(500).json({
          data: "INTERNAL_SERVER_ERROR",
          success: false,
        });
      }
      res.status(200).json({
        data: updatedUser.data,
        success: true,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  public static addToCart: RequestHandler = async (req, res, next) => {
    try {
      const { product } = req.body;
      const updatedCart = await UserRepository.addproductsToCart(
        product,
        req.user
      );
      if (!updatedCart.success) {
        throw new Error("Something went wrong!");
      }
      res.status(200).json({
        updatedCart,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  public static removeFromCart: RequestHandler = async (req, res, next) => {
    try {
      const updatedCart = await UserRepository.deleteProductsFromCart(
        req.body.product,
        req.user
      );
      if (!updatedCart.success) {
        throw new Error("Something went wrong!");
      }
      res.status(200).json({
        updatedCart,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default UserServices;
