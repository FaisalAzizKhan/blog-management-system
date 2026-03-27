import { toast } from "react-toastify";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const CreateNewUser = () => {
  document.title = "Create New User";

  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: createNewUser } = useTenStackMutation({
    url: BackendEndpoints.Users.createNew, 
    method: HTTPAxiosMethod.POST as any,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(e.currentTarget));

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role || "user",
      };

      await createNewUser(payload, {
        onSuccess: () => {
          toast.success("User created successfully");
          formRef.current?.reset();
        },
        onError: () => {
          toast.error("Error creating user");
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
      <Link to="/app/users" className="text-sm text-blue-600 py-2 hover:underline">
        ← Back to Users
      </Link>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New User
      </h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Password</label>
          <input
            name="password"
            type="text"
            placeholder="Enter password"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Role</label>
          <select name="role" className={inputClass}>
            {["author", "admin"].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Create User
        </button>
      </form>
    </div>
  );
};
