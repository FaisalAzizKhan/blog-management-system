import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Post } from "../models/posts.models";

export const PostController = {

  getAllPost: async (req: Request, res: Response) => {
    
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "comments",  
          localField: "_id",
          foreignField: "post",
          as: "comments",
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
      { $unwind: "$author" }, 
    ]);;

    return res.status(200).json({
      message: "All Post",
      data: posts,
    });
  },

  createNew: async (req: Request, res: Response) => {
    try {
      const { title, content, author, status, tags }: IPost = req.body;
      const loggedin_user_id = req?.user?.loggedin_user_id;
 

      const newPost = await Post.create({
        title,
        content,
        author: loggedin_user_id,
        status,
        tags,
      });
      
 

      return res.status(201).json({
        message: "New Post Created Successfully",
        data: newPost,
      });

    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
