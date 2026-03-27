import { Router } from "express";
import { PostController } from "../controller/post.controller.ts";
import { verifyToken } from "../utilities/token/token.utilities.ts";


const PostRouter = Router();

PostRouter.use(verifyToken);
PostRouter.post("/create-new", PostController.createNew);
PostRouter.get("/get-all", PostController.getAllPost);


export default PostRouter;
