import { Router } from "express";
import UserServices from "../services/user.service";

const authRouter = Router();
authRouter.post("/signup", UserServices.signup);
authRouter.post("/login", UserServices.login);
export { authRouter };
