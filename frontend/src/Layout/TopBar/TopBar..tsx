import { MdDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { CgLogOut } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const TopBar = () => {
  const location = useLocation();

  const user = useSelector((state: any) => state?.auth?.user);

  const TopBarItems = [
    {
      name: "Dashboard",
      icon: MdDashboard,
      link: "/app/dashboard",
      adminOnly: false,
    },
    { name: "Blogs", icon: GoTasklist, link: "/app/blogs", adminOnly: true },
    { name: "Users", icon: GoPeople, link: "/app/users", adminOnly: false },
  ];

  return (
    <div className=" flex justify-between max-w-[80%] mx-auto py-2 px-2 border-blue-300  border-2 rounded-lg bg-blue-50 ">
      <div className=" flex">
        {TopBarItems.filter(
          (item) => user?.role === "admin" || !item.adminOnly
        ).map((item) => (
          <Link
            to={item.link || "#"}
            key={item.name}
            className={
              `flex items-center gap-1 p-3 rounded-lg cursor-pointer  ` +
              (location.pathname
                .toLowerCase()
                .includes(item.link?.toLowerCase() as string)
                ? "bg-blue-400 "
                : "")
            }
          >
            <item.icon className="text-xl" />
            {<span>{item.name}</span>}
          </Link>
        ))}
      </div>

      <Link
        to="/"
        key="logout"
        className=" flex items-center gap-1 p-3 rounded-lg   cursor-pointer"
      >
        <CgLogOut className="text-xl" />
        Logout
      </Link>
    </div>
  );
};
