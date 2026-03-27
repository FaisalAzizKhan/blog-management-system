import { Route, Routes } from "react-router-dom";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import MainLayout from "../../../Layout/MainLayout/MainLayout";  
import { Blog } from "../../../Pages/Blog/Blog";
import { SingleBlog } from "../../../Pages/Blog/SingleBlog";
import { CreateNewBlog } from "../../../Pages/Blog/CreateNewBlog";
import { UsersPage } from "../../../Pages/Users/UsersPage";
import { CreateNewUser } from "../../../Pages/Users/CreateNewUsers";


export const UserRoutes = () => {
  const routes = [
    { path: "dashboard", element: <Dashboard />, title: "Dashboard" },
    { path: "blogs", element: <Blog />, title: "Blog" },
    { path: "blogs/:blog_id", element: <SingleBlog />, title: "Blog" },
    { path: "blogs/create", element: <CreateNewBlog />, title: "Blog" },
    { path: "users", element: <UsersPage />, title: "Users" },
    { path: "users/create", element: <CreateNewUser />, title: "Users" },
  ];

 return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
           element={<MainLayout pageTitle={route.title}>{route.element}</MainLayout>}
        />
      ))}
    </Routes>
  );
};



