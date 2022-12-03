import { Types, Document, ObjectId } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  cart?: [
    {
      product: string;
      varient: {
        color?: string;
        size?: string;
      };
      quantity: number;
    }
  ];
  ip: Object;
  passwordChangedAt: number;
  dateOfBirth: Date;
  confirmPassword: string;
  role?: string;
  _id?: Types.ObjectId;
  phone?: Number;
  isVerified: Boolean;
  deliveryAddress: {
    country: string;
    fullName: string;
    mobileNumber: number;
    pincode: number;
    buildingNumber?: string;
    flatNumber?: string;
    landmark: string;
    city?: string;
    state: string;
  };
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
  product: {
    product: string;
    varient: {
      color?: string;
      size?: string;
    };
    quantity: number;
  },
  user: UserType
) => Promise<RepositoryReturnType>;

export type UpdateDeliveryAddress = (
  adress: {
    country: string;
    fullName: string;
    mobileNumber: number;
    pincode: number;
    buildingNumber: string;
    flatNumber: string;
    landmark: string;
    city: string;
    state: string;
  },
  user: UserType
) => Promise<RepositoryReturnType>;
