import { useState, type FC } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";


const CustomInput: FC<{ field: any; errors?: any }> = ({ field, errors }) => {
  
  // @ts-ignore
  const errorMsg: string | any = (errors && errors?.[field.name]) || "";
  const [showPassword, setShowPassword] = useState(true)

  return (
    <div className=" mb-4 relative">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1 text-left">
        {field.label}
      </label>
     
      <input
        type={field.type === "password" ? (showPassword ? "password" : "text") : field.type}
        name={field.name as string}
        placeholder={field.label}
        className={
          "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " +
          field.css
        }
      />

      <div>
        {field.type === "password" && (
          <span className="absolute right-3 top-[40px] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaRegEyeSlash className=" text-xl" /> : <FaRegEye className=" text-xl" />}
          </span>
        )}
      </div>

      {errors && errors?.[field.name] && (
        <div className="text-red-500 text-xs absolute -bottom-3">
          {errors?.[field.name] || ""}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
