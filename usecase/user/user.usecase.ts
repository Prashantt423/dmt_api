import { sign } from "jsonwebtoken";
import { Types } from "mongoose";
import { compare } from "bcryptjs";

class UserUsecase {
  public static generateToken = (id: Types.ObjectId | string) => {
    return sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  public static checkPasswords = async (
    userPassword: string,
    reqPassword: string
  ) => {
    return await compare(reqPassword, userPassword);
  };
  public static compareTimeStamps = (
    issuedAt: number,
    passwordChangedAt: number
  ) => {
    const pwcAt = passwordChangedAt / 1000;
    return pwcAt > issuedAt ? true : false;
  };
}

export default UserUsecase;
