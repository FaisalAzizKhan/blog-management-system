import { Router } from "express";
import { verifyToken } from "../utilities/token/token.utilities";
import { CommentController } from "../controller/comments.controller";



const CommentRouter = Router();

CommentRouter.use(verifyToken);
CommentRouter.post("/create-new", CommentController.createNew);
CommentRouter.get("/get-all-by-post-id", CommentController.getAllComments);


export default CommentRouter;
