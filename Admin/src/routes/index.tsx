import { createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Pages/Dashboard";
import Products from "../Pages/Products";
import AddProduct from "../Pages/AddProduct";
import CategoryPage from "../Pages/Category";
import SubCategoryPage from "../Pages/SubCategory";
import User from "../Pages/Users/user";
import Orders from "../Pages/Orders";
import HomeSlider from "../Components/HomeSlides";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/FogotPassword";
import SignUp from "../Pages/sign-up";
import Profile from "../Pages/Profile";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen } = useContext(MyContext);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`min-h-screen transition-all duration-300 ${isSideBarOpen ? "ml-[18%]" : "ml-0"}`}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/products",
    element: (
      <Layout>
        <Products />
      </Layout>
    ),
  },
  {
    path: "/products/upload",
    element: (
      <Layout>
        <AddProduct />
      </Layout>
    ),
  },
  {
    path: "/home-slides",
    element: (
      <Layout>
        <HomeSlider />
      </Layout>
    ),
  },
  {
    path: "/category",
    element: (
      <Layout>
        <CategoryPage />
      </Layout>
    ),
  },
  {
    path: "/sub-category",
    element: (
      <Layout>
        <SubCategoryPage />
      </Layout>
    ),
  },
  {
    path: "/users",
    element: (
      <Layout>
        <User />
      </Layout>
    ),
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <Orders />
      </Layout>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
]);

export default router;
