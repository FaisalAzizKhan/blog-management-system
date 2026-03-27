import { SmallLoading } from "../Loading/SmallLoading/SmallLoading";

const CustomButtonWithLoading: React.FC<{
  isLoading: boolean;
  buttonName?: string;
}> = ({ isLoading, buttonName }) => {
  return (
    <button
      type="submit"
      className={`w-full px-4 py-3 text-white my-4 cursor-pointer font-semibold rounded-md ${
        isLoading ? "bg-gray-400" : "hover:bg-gray-900"
      }`}
      style={
        !isLoading
          ? {
              background:
                "linear-gradient(to bottom, hsla(208, 86%, 62%, 1), hsla(214, 82%, 51%, 1))",
            }
          : {}
      }
      disabled={isLoading}
    >
      {isLoading ? <SmallLoading /> : buttonName || "Login"}
    </button>
  );
};

export default CustomButtonWithLoading;
