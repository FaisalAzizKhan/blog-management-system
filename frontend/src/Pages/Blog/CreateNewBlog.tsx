import { toast } from "react-toastify";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { useRef } from "react";

export const CreateNewBlog = () => {
  document.title = "Create New Blog";

  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: createNewBlog } = useTenStackMutation({
    url: BackendEndpoints.Post.CreateNew,
    method: HTTPAxiosMethod.POST as any,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(e.currentTarget));

      const payload = {
       ...formData,
        status: formData.status || "draft",
        tags: formData.tags
          ? (formData.tags as string)
              .split(",")
              .map((tag: string) => tag.trim())
          : [],
      };
      // return console.log(payload);
      await createNewBlog(payload, {
        onSuccess: () => {
          toast.success("Blog created successfully");
          formRef.current?.reset();
        },
        onError: () => {
          toast.error("Error creating blog");
        },
      });
    } catch (err) {
      toast.error("Unexpected error");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New Blog
      </h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className={labelClass}>Title</label>
          <input
            name="title"
            placeholder="Enter blog title"
            className={inputClass}
          />
        </div>

 
        <div>
          <label className={labelClass}>Content</label>
          <textarea
            name="content"
            placeholder="Write your blog content..."
            rows={5}
            className={inputClass}
          />
        </div>
 
        <div>
          <label className={labelClass}>Image URL</label>
          <input
            name="image_url"
            placeholder="https://example.com/image.jpg"
            className={inputClass}
          />
        </div>

  
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" className={inputClass}>
            {["draft", "published"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

    
        <div>
          <label className={labelClass}>
            Tags <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            name="tags"
            placeholder="nodejs, backend, javascript"
            className={inputClass}
          />
        </div>

  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};
