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

type MyContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export const MyContext = createContext<MyContextType>({
  isSideBarOpen: true,
  setIsSideBarOpen: () => undefined,
});

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const value: MyContextType = {
    isSideBarOpen,
    setIsSideBarOpen,
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
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
  ]);

  return (
    <MyContext.Provider value={value}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
