import { Route, Routes } from "react-router-dom";
// import { AdminRoutes } from "../SubRoutes/AdminRoutes/AdminRoutes";
// import MainLayout from "../../Layout/MainLayout/MainLayout";
import { UserRoutes } from "../SubRoutes/UserRoutes/UserRoutes";
import { AuthRoutes } from "../SubRoutes/AuthRoutes/AuthRoutes";
// import TopSearchBar from "../../Layout/Topbar/TopSearchBar";

export const RouteConfig = () => {
  const routes = [
    {
      path: "/*",
      element: <AuthRoutes />,
      Layout: true,
    },
    {
      path: "/app/*",
      element: <UserRoutes />,
      Layout: false,
    },
  ];
 
  return (
    <Routes>
      {routes.map((route, index) => 
          <Route
            key={index}
            path={route.path}
            element={ route.element } />
      )}
    </Routes>
  );
};