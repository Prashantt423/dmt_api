import { Schema, model } from "mongoose";
import { UserType } from "../types/user.types";
import { hash, compare } from "bcryptjs";

const userSchema = new Schema<UserType>({
  name: {
    required: true,
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  confirmPassword: {
    required: true,
    type: String,
  },
  cart: {
    type: [String],
  },
  ip: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  passwordChangedAt: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPasswords = async function (
  reqPassword: string,
  userPassword: string
) {
  return await compare(reqPassword, userPassword);
};

userSchema.methods.compareTimestamps = function (jwtTimeStamp: number) {
  if (this.passwordChangedAt) {
    const timeStamp = (this.passwordChangedAt.getTime() / 1000, 10);
    return timeStamp > jwtTimeStamp;
  }
  return false;
};

const UserModel = model<UserType>("User", userSchema);
export default UserModel;
