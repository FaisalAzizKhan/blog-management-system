import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Comment } from "../models/comments.model";
import mongoose from "mongoose";

export const CommentController = {
  getAllComments: async (req: Request, res: Response) => {
    const postId =
      req?.query?.blog_id || req?.params?.blog_id || req?.body?.blog_id;

    if (!postId) {
      return res.status(400).json({ message: "blog_id is required" });
    }

    const comments = await Comment.aggregate([
      {
        $match: {
          post: new mongoose.Types.ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json({
      message: "All Comments",
      data: comments,
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
