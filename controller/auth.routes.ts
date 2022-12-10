import { Router } from "express";
import UserServices from "../service/user.service";
import AuthMiddleWare from "../middleware/auth.middleware";

const authRouter = Router();
authRouter.post("/signup", UserServices.signup);
authRouter.post("/login", UserServices.login);
authRouter.get("/all", UserServices.all);
authRouter.get("/verify", UserServices.verify); // verify?token={tokenized email}

export { authRouter };
