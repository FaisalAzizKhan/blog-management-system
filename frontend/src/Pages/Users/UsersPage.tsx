import { useState } from "react";
import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { SmallLoading } from "../../Utiles/Loading/SmallLoading/SmallLoading";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
    
  document.title = "Users - Git Blog Tracker";
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number(searchParams.get("page_no")) || 1;
  const [page_no, setPageNo] = useState<any>(initialPage);
  const [page_size] = useState<number>(6);
 

  const { data: GetAllUsers, isLoading } = useTenStackQuery({
    key: ["Users"],
    url: BackendEndpoints.Users?.GetAll,
    params: { page_no, page_size },
  });

      

  const Users = GetAllUsers?.data?.data || [];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-semibold">All Users</h1>

        <button
          onClick={() => navigate("/app/users/create")} // adjust route
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-800 transition"
        >
          + New User
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <SmallLoading />
      ) : Users.length ? (
        <div className="space-y-3">
          {Users.map((user: any) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className=" flex gap-2">
                <div
                  className="h-8 w-8 flex items-center justify-center rounded-full 
                          bg-gradient-to-r from-blue-500 to-indigo-500 
                          text-white text-sm font-semibold"
                >
                  <FaRegUser className="text-sm" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="text-sm">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    user.role === "admin" ? "bg-green-500" : "bg-blue-500"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          ))}
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
              disabled={Users.length < page_size}
              onClick={() => setPageNo((prev: any) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No Users found.</p>
      )}
    </div>
  );
};
