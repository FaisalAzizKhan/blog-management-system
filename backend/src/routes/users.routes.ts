import { Router } from "express";
import { UsersController } from "../controller/users.controller";


const UsersRouter = Router();

UsersRouter.post("/create-new", UsersController.createNew);
UsersRouter.get("/get-all", UsersController.getAllUsers);


export default UsersRouter;
