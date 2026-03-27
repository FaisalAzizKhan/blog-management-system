import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";


const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);



export default AuthRouter;
