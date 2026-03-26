import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Comment } from "../models/comments.model";

export const CommentController = {
  getAllComments: async (req: Request, res: Response) => {
    const Comments = await Comment.find({}).exec();

    return res.status(200).json({
      message: "All Comment",
      data: Comments,
    });
  },

  createNew: async (req: Request, res: Response) => {
    try {
      const { content, author, post }: IComment = req.body;
      const loggedin_user_id = req?.user?.loggedin_user_id;

      const newComment = await Comment.create({
        content: content,
        post: post,
        author: loggedin_user_id,
      });

      return res.status(201).json({
        message: "New Comment Created Successfully",
        data: newComment,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
