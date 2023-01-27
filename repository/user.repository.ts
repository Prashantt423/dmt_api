import UserUsecase from "../usecase/user/user.usecase";
import User from "../model/user.model";
import {
  // AddPorductsToCart,
  Cart,
  FindUser,
  LoginReturnType,
  SignupReturnType,
  UpdateDeliveryAddress,
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
  public static doEmailExist = async (email: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (user === null || user.email != email) {
        return {
          isPresent: false,
        };
      } else {
        console.log(user);
        return {
          isPresent: true,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        error: true,
        isPresent: false,
      };
    }
  };

  public static updateStatus = async (email: string) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { isVerified: true }
      );

      return {
        data: user,
        error: false,
      };
    } catch (e) {
      console.log(e);
      return {
        error: true,
        isPresent: false,
      };
    }
  };
  public static logIn: LoginReturnType = async (email, password) => {
    try {
      //Check if the credentials are actually presnet
      if (!email || !password) {
        return {
          success: false,
          code: 400,
          data: "Passowrd or email does not exsists",
        };
      }
      //Check if the email matches with a user
      const user = await User.findOne({ email }).select("+password");
      //Check passwords
      let compare;
      if (user) {
        compare = await UserUsecase.checkPasswords(user?.password, password);
      }

      if (!user || !compare) {
        return {
          success: false,
          code: 401,
          data: "Incorrect password/email!",
        };
      }

      if (!user.isVerified)
        return {
          success: false,
          data: "Email is not verified!",
          code: 401,
        };
      // Generate token
      // const token = generateToken(user._id);
      return {
        success: true,
        data: user,
        code: 200,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        data: null,
        code: 500,
      };
    }
  };
  public static updateDeliveryAdress: UpdateDeliveryAddress = async (
    address,
    user
  ) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: { deliveryAddress: address },
        },
        {
          new: true,
        }
      );
      console.log({ updatedUser });
      return {
        success: true,
        data: updatedUser,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
        message: e,
      };
    }
  };
  public static addproductsToCart: Cart = async (product, user) => {
    console.log(product);
    try {
      const currUser = await User.findById(user._id);
      currUser.cart.push(product);
      const updatedUser = await currUser.save({ validateBeforeSave: false });

      return {
        data: updatedUser,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        success: false,
      };
    }
  };
  public static all = async () => {
    try {
      const users = await User.find({});
      return {
        data: users,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        success: false,
      };
    }
  };
  public static deleteProductsFromCart: Cart = async (product, userId) => {
    try {
      const user = await User.findById(userId._id);
      const itemToRemove = user.cart.findIndex((el, i) => {
        return (
          el.product === product.product &&
          UserUsecase.haveSameData(el.varient, product.varient)
        );
      });
      user.cart.splice(itemToRemove, 1);

      const updatedUser = await user.save({ validateBeforeSave: false });
      return {
        data: updatedUser,
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        data: null,
        success: false,
      };
    }
  };
}

export default UserRepository;
