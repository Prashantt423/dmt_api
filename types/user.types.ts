import { Types } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  password: string;
  cart: [Types.ObjectId];
  ip: string;
  passwordChangedAt: Date;
  dateOfBirth: Date;
}
