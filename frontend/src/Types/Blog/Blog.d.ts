 interface IBlog {
   _id: string;
   title: string;
   content: string;
   status: "draft" | "published";
   tags: string[];
   author: IAuthor;
   image_url: string;
   comments?: IBlogComment[];
   createdAt: string;
   updatedAt: string;
 }

 interface IAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface IBlogComment {
  blog_comment_id: string;
  comment: string;
  created_at: string;
}
