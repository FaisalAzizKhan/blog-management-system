import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

export const BlogCards = ({ data }: any) => {
  const isPublished = data?.status === "published";
  const authorName = data?.author?.name || "Unknown";

  return (
    <Link
      to={`/app/blogs/${data?._id}`}
      className="group block bg-white border border-gray-200 rounded-2xl p-5 mb-5 
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 flex items-center justify-center rounded-full 
                          bg-gradient-to-r from-blue-500 to-indigo-500 
                          text-white text-sm font-semibold"
          >
            <FaRegUser className="text-sm" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              {authorName}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(data?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden justify-between items-center mb-3">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium tracking-wide
          ${
            isPublished
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {data?.status}
        </span>

     
        <span className="text-xs text-gray-400">#{data?._id?.slice(-5)}</span>
      </div>

      <div className=" flex justify-between">
        <div className=" w-full object-contain">
          <img src={data?.image_url} className="flex pb-2 mx-auto object-contain" />
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {data?.title}
          </h2>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {data?.content}
          </p>

          {data?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className=" flex items-end justify-end">
          <div className="flex items-end h-full i gap-1 text-sm text-gray-500">
            <div className=" flex items-center gap-1">
              <span className="text-lg">💬</span>
              <span>{data?.commentsCount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
