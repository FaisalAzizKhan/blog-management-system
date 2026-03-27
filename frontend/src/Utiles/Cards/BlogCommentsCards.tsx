import { FaRegUser } from "react-icons/fa6";

export const BlogCommentsCards = ({ data }: any) => {
  const authorName = data?.author?.name || "Unknown";

  return (
    <div
      onClick={() => console.log("Comment clicked:", data)}
      className="group flex gap-3 p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm shadow">
        <FaRegUser className="text-sm" />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">
              {authorName}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">{data?.comment}</p>
        <span className="text-xs text-gray-400">
          {new Date(data?.createdAt).toLocaleString()}
        </span>
 
      </div>
    </div>
  );
};
