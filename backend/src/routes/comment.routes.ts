import { Router } from "express";
import { verifyToken } from "../utilities/token/token.utilities";
import { CommentController } from "../controller/Comments.controller";



const CommentRouter = Router();

CommentRouter.use(verifyToken);
CommentRouter.post("/create-new", CommentController.createNew);
CommentRouter.get("/get-all", CommentController.getAllComments);


export default CommentRouter;
