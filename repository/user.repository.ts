import UserUsecase from "../usecase/user/user.usecase";
import User from "../model/user.model";
import {
  FindUser,
  LoginReturnType,
  SignupReturnType,
  UserType,
} from "../types/user.types";

class UserRepository {
  public static signUp: SignupReturnType = async (user: UserType) => {
    try {
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        ip: user.ip,
        dateOfBirth: user.dateOfBirth,
        passwordChangedAt: new Date(Date.now()),
      });
      const savedUser = await newUser.save();
      return {
        data: savedUser,
        success: true,
      };
    } catch (err) {
      console.log(err);
    }
  };
  public static getUser = async (_id: string) => {
    try {
      const user = await User.findById({ _id });
      return {
        data: user,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
      };
    }
  };
  public static logIn: LoginReturnType = async (email, password) => {
    try {
      //Check if the credentials are actually presnet
      if (!email || !password) {
        throw new Error("Passowrd or email does not exsists");
      }
      //Check if the email matches with a user
      const user = await User.findOne({ email }).select("+password");
      //Check passwords

      const compare = await UserUsecase.checkPasswords(user.password, password);
      if (!user || !compare) {
        throw new Error("Password you entered does not match");
      }
      //Generate token
      // const token = generateToken(user._id);
      return {
        success: true,
        data: user,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        data: null,
      };
    }
  };
}

export default UserRepository;
