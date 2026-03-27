

import { Route, Routes } from "react-router-dom";
import LoginPage from "../../../Pages/Login/Login";

export const AuthRoutes = () => {
  const routes = [
    { path: "", element: <LoginPage /> },
    // { path: "signup", element: <SignupPage /> },
  ];


  return (
    <Routes>
      {routes.map((route: any, index: number) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
