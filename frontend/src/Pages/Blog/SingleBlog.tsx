import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullLoading } from "../../Utiles/Loading/FullLoading/FullLoading";
import { SmallLoading } from "../../Utiles/Loading/SmallLoading/SmallLoading";
import { BlogCommentsCards } from "../../Utiles/Cards/BlogCommentsCards";
import { CustomComment } from "../../Utiles/CustomInput/CustomComment";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa6";

export const SingleBlog: React.FC = () => {
  const BlogId: string = useLocation().pathname.split("/").slice(-1)[0];

  const [showAll, setShowAll] = useState(false);
  const [page_no, setPageNo] = useState(1);
  const [page_size] = useState(10);
  const [allComments, setAllComments] = useState<any[]>([]);

  const { data: GetAllBlogs, isLoading: isLoadingBlog } = useTenStackQuery({
    key: ["Blog", BlogId],
    url: BackendEndpoints.Post.GetAll,
    params: { blog_id: BlogId },
  });

  const {
    data: GetAllBlogComments,
    isLoading: isLoadingComments,
    refetch,
  } = useTenStackQuery({
    key: ["Blog-comments", BlogId, page_no as any],
    url: BackendEndpoints.Comment.GetAllComments,
    params: { blog_id: BlogId, page_no, page_size },
  });

  const { mutate: createNewComment } = useTenStackMutation({
    url: BackendEndpoints.Comment.CreateNewComment,
    method: HTTPAxiosMethod.POST as any,
  });

  const blog: IBlog | undefined = GetAllBlogs?.data?.data?.[0];
  const comments: any[] = GetAllBlogComments?.data?.data || [];

 
  useEffect(() => {
    if (!comments.length) return;

    if (page_no === 1) {
      setAllComments(comments);
    } else {
      setAllComments((prev) => {
        const existingIds = new Set(prev.map((c) => c._id));
        const newComments = comments.filter((c) => !existingIds.has(c._id));
        return [...prev, ...newComments];
      });
    }
  }, [comments, page_no]);

  const visibleComments = showAll ? allComments : allComments.slice(0, 3);

  if (isLoadingBlog) return <FullLoading />;
  if (!blog) return <div className="p-4">Blog not found</div>;

  const handleCreateComment = async (e: any) => {
    
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const payload = {
      post: BlogId,
      content: formData.comment,
    };

    createNewComment(payload, {
      onSuccess: () => {
        e.target.reset();
        toast.success("Comment created successfully");
        setPageNo(1);
        refetch();
      },
      onError: (err: any) => {
        console.error("Error creating comment", err);
        toast.error("Error creating comment");
      },
    });
 
  };

  const handleLoadMore = () => setPageNo((prev) => prev + 1);

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-6 px-4">
      <Link to="/app/Blogs" className="text-sm text-blue-600 hover:underline">
        ← Back to Blogs
      </Link>

      {/* BLOG DETAILS */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
            <FaRegUser className="text-sm" />
          </div>

          <div className="text-sm">
            <p className="font-medium">{blog.author?.name}</p>
            <p className="text-gray-400 text-xs">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">{blog.title}</h1>
        <img
          src={blog?.image_url}
          className="flex py-2 mx-auto object-contain"
        />
        <p className="text-gray-600 mt-3 leading-relaxed">{blog.content}</p>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Comments ({allComments.length})
        </h2>

        {isLoadingComments && page_no === 1 ? (
          <SmallLoading />
        ) : (
          <>
            <div className="space-y-3">
              {visibleComments.map((c: any) => (
                <BlogCommentsCards
                  key={c._id}
                  data={{
                    _id: c._id,
                    comment: c.content, // ✅ FIX
                    author: c.author,
                    createdAt: c.createdAt,
                  }}
                />
              ))}
            </div>

            {!showAll && allComments.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-4 text-blue-600 text-sm hover:underline"
              >
                Show More ({allComments.length - 3})
              </button>
            )}

            {showAll && (
              <button
                onClick={handleLoadMore}
                className="mt-4 text-blue-600 text-sm hover:underline"
              >
                {isLoadingComments ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        )}

        {/* ADD COMMENT */}
        <form onSubmit={handleCreateComment} className="mt-6">
          <CustomComment field={{ name: "comment", label: "Add a comment" }} />
        </form>
      </div>
    </div>
  );
};
