import { useContext } from "react";
import { MdMenu, MdNotificationsNone } from "react-icons/md";
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
        <MdMenu
          onClick={() => context.setIsSideBarOpen(!context.isSideBarOpen)}
          className="text-2xl"
        />
      </button>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <MdNotificationsNone className="text-2xl text-gray-600" />

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            4
          </span>
        </div>

        {/* Profile */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;