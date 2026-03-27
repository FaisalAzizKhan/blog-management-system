interface IPost   {
  title: string,
  content: string,
  image_url: string,
  author: Types.ObjectId,
  status: PostStatus,
  tags: string[],
  created_at: Date,
  updated_at: Date,
  
}
