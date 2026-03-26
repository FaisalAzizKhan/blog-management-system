interface IComment {
  content: string,
  author: Types.ObjectId,
  post: Types.ObjectId,
  createdAt: Date,
}
