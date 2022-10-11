import { RequestHandler } from "express";
import User from "../model/user.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      ip: req.body.ip,
      dateOfBirth: req.body.dateOfBirth,
      passwordChangedAt: Date.now(),
      role: "USER",
      // passwordChangedAt: req.body.passwordChangedAt,
    });
    const token = generateToken(newUser._id);
    res.status(201).json({
      status: "Sucess",
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
