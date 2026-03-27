import React, { useState } from "react";
// import { FaGithubAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { loginPageValidationSchema } from "../../Utiles/ValidationSchema/schema/LoginPage";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
// import { validateForm } from "../../Utiles/ValidationSchema/method/validate";

import { BackendEndpoints } from "../../Services/Urls/Urls";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { useAppDispatch } from "../../Store/ReduxToolkit/Store";
import { setCredentials } from "../../Store/ReduxToolkit/AuthSlice";
import CustomButtonWithLoading from "../../Utiles/CustomButtons/CustomButtonWithLoading";
import CustomInput from "../../Utiles/CustomInput/CustomInput";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, _] = useState<any>();

  document.title = "Login";

  const { mutate: userlogin, isLoading } = useTenStackMutation({
    url: BackendEndpoints.Auth.Login,
    method: HTTPAxiosMethod.POST as any,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: LoginFormData | any = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    console.log(formData);

    try {
      // const isValid = validateForm(
      //   formData,
      //   loginPageValidationSchema,
      //   setErrors
      // );

      // if (!isValid) return;

      await userlogin(formData, {
        onSuccess: (data: any) => {
          const { token, ...alldata } = data?.data?.data;
        
          toast.success("Login successful");
          useAppDispatch(
            setCredentials({
              user: alldata,
              token: token,
              expiresIn: 3600,
            })
          );
          navigate("/app/dashboard");
        },
        onError: (error: any) => {
          console.error("Login error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        },
      });
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("An error occurred during login");
    }
  };

  const fields: FieldInterface[] = [
    { label: "Email", type: "text", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];

  // <FaGithubAlt className="text-9xl mb-5 text-slateblue" />

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-200 flex items-center justify-center">
      <div className="  bg-white rounded-xl shadow-2xl p-7 w-full max-w-md h-[60%]">
        <div className="w-full px-9 inline-block text-center  ">
          <div className="flex items-center p-10 flex-col ">
            <div className="text-6xl font-bold font-serif">Blogee</div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg w-full ">
            {fields.map((field: FieldInterface | any) => (
              <div key={field?.name} className="mb-4">
                <CustomInput field={field} errors={errors} />
              </div>
            ))}
            <CustomButtonWithLoading isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
