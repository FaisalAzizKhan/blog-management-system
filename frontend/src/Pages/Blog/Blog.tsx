import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { SmallLoading } from "../../Utiles/Loading/SmallLoading/SmallLoading";
import { BlogCards } from "../../Utiles/Cards/BlogCards";

export const Blog = () => {
  document.title = "Blogs - Git Blog Tracker";

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialStatus = searchParams.get("status") || "";
  const initialPage = Number(searchParams.get("page_no")) || 1;

  const [page_no, setPageNo] = useState<any>(initialPage);
  const [page_size] = useState<number>(6);
  const [status, _] = useState<string>(initialStatus);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    params.set("page_no", String(page_no));

    navigate({ search: params.toString() }, { replace: true });
  }, [status, page_no, navigate]);

  const { data: GetAllBlogs, isLoading } = useTenStackQuery({
    key: ["Blogs", status, page_no],
    url: BackendEndpoints.Post.GetAll,
    params: { page_no, page_size, status },
  });

  const Blogs = GetAllBlogs?.data?.data || [];

  return (
    <div className=" max-w-5xl mx-auto">
      <div className="flex justify-between items-center py-2">
        <div
          onClick={() => console.log(Blogs)}
          className="text-3xl font-semibold ml-1"
        >
          All Blogs
        </div>
      </div>

      {isLoading ? (
        <SmallLoading />
      ) : Blogs.length ? (
        <>
          <ul>
            {Blogs.map((blog: any) => (
              <BlogCards
                key={blog._id}
                data={{
                  ...blog,
                  commentsCount: blog.comments?.length || 0, // optional helper
                }}
              />
            ))}
          </ul>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={page_no === 1}
              onClick={() => setPageNo((prev: any) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">Page {page_no}</span>

            <button
              disabled={Blogs.length < page_size}
              onClick={() => setPageNo((prev: any) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No Blogs found.</p>
      )}
    </div>
  );
};
