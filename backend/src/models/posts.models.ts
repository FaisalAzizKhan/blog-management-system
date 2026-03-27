import mongoose, { Schema } from "mongoose";
import { PostStatus } from "../types/post.enums";


 
const PostSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image_url: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.DRAFT,
    },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

 
export const Post = mongoose.model<IPost>("Post", PostSchema);
