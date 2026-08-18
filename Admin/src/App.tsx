import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";


import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AddProduct, { type NewProduct } from "./Pages/AddProduct";
import Subcategory from "./Components/SubCategory";
import User from "./Pages/Users/user";
import Orders from "./Pages/Orders";
import HomeSlider from "./Components/HomeSlides";
import ForgotPassword from "./Pages/FogotPassword";

type MyContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export const MyContext = createContext<MyContextType>({
  isSideBarOpen: true,
  setIsSideBarOpen: () => undefined,
});

function App() {
  // Sidebar
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  // Add Product Dialog
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const value: MyContextType = {
    isSideBarOpen,
    setIsSideBarOpen,
  };

  // Close Add Product dialog
  const handleClose = () => {
    setIsAddProductOpen(false);
  };

  // Save Product
  const handleSave = (product: NewProduct) => {
    console.log("New Product:", product);

    setIsAddProductOpen(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <Dashboard />
            </main>
          </div>
        </div>
      ),
    },

    {
      path: "/products",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <Products />
            </main>
          </div>
        </div>
      ),
    },

    {
      path: "/products/upload",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <AddProduct />
            </main>
          </div>
        </div>
      ),
    },
    {
      path: "//home-slides",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <HomeSlider />
            </main>
          </div>
        </div>
      ),
    },
   
    {
      path: "/category",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <Subcategory />
            </main>
          </div>
        </div>
      ),
    },
   
    {
      path: "/users",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <User />
            </main>
          </div>
        </div>
      ),
    },
    {
      path: "/orders",
      element: (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className={`min-h-screen transition-all duration-300 ${
              isSideBarOpen ? "ml-[18%]" : "ml-0"
            }`}
          >
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="p-6">
              <Orders />
            </main>
          </div>
        </div>
      ),
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ]);

  return (
    <MyContext.Provider value={value}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
