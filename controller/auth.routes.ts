import { Router } from "express";
import UserServices from "../services/user.service";
import AuthMiddleWare from "../middleware/auth.middleware";

const authRouter = Router();
authRouter.post("/signup", UserServices.signup);
authRouter.post("/login", AuthMiddleWare.authorization, UserServices.login);

export { authRouter };
