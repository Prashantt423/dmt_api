import { Schema } from "mongoose";
import { UserType } from "../types/user.types";

const userSchema = new Schema<UserType>({
  name: {
    required: true,
    type: String,
  },
});
