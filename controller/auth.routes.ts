import { Router } from "express";
import UserServices from "../service/user.service";
import AuthMiddleWare from "../middleware/auth.middleware";

const authRouter = Router();
authRouter.post("/signup", UserServices.signup);
authRouter.post("/login", UserServices.login);

export { authRouter };
