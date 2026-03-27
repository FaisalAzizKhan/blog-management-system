import { useSelector } from "react-redux";

const Dashboard = () => {
  const UsersDetails = useSelector((state: any) => state?.auth?.user);

  return (
    <div className="flex min-h-screen w-full items-start flex-col mt-2 max-w-5xl mx-auto">
      <div onClick={() => console.log(UsersDetails)} className=" ">
        <div className="space-y-2 px-2">
          <p>
            <span className="font-semibold text-2xl pr-1 capitalize">
              Welcome
            </span>
            <span className="capitalize font-semibold text-2xl">
              {UsersDetails?.name}
            </span>
          
          </p>
          <p>
            <span className="font-semibold pr-1">Email:</span>{" "}
            {UsersDetails?.email}
          </p>
          <p>
            <span className="font-semibold pr-1">Phone:</span>
            {UsersDetails?.phone || "N/A"}
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
