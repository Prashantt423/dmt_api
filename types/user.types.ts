import { Types } from "mongoose";

enum Roles {
  admin = "ADMIN",
  user = "USER",
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  cart: [Types.ObjectId];
  ip: string;
  passwordChangedAt: Date;
  dateOfBirth: Date;
  confirmPassword: string;
  role: string;
  _id: Types.ObjectId;
}
