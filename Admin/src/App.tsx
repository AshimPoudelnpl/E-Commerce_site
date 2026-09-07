import "./App.css";
import { RouterProvider } from "react-router-dom";
import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import router from "./routes";
import { Toaster } from "react-hot-toast";

type MyContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
};

export const MyContext = createContext<MyContextType>({
  isSideBarOpen: true,
  setIsSideBarOpen: () => undefined,
  avatar: "",
  setAvatar: () => undefined,
});

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem("adminAvatar") || "");

  const value: MyContextType = {
    isSideBarOpen,
    setIsSideBarOpen,
    avatar,
    setAvatar,
  };

  return (
    <MyContext.Provider value={value}>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
