import { Types, Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  cart?: [Object];
  ip: Object;
  passwordChangedAt: number;
  dateOfBirth: Date;
  confirmPassword: string;
  role?: string;
  _id?: Types.ObjectId;
  phone?: Number;
  isVerified: Boolean;
}

type Signup = {
  data: any;
  success: boolean;
};

type Login = {
  data: any;
  success: boolean;
  code?: number;
};

export type SignupReturnType = (user: UserType) => Promise<Signup>;

export type LoginReturnType = (
  email: string,
  password: string
) => Promise<Login>;

type RepositoryReturnType = {
  data: any;
  success: boolean;
  code?: number;
};
export type FindUser = (
  userId: Types.ObjectId
) => Promise<RepositoryReturnType>;

export type Cart = (
  product: { product: string; varient: {} },
  user: UserType
) => Promise<RepositoryReturnType>;
