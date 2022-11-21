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
  public static haveSameData = function (obj1: any, obj2: any) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
      );
    }
    return false;
  };
}

export default UserUsecase;
