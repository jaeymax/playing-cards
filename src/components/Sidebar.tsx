import { FC } from "react";
import { useAppContext } from "../contexts/AppContext";
import { RiMenuFoldLine } from "react-icons/ri";

interface SidebarProps {
  open: boolean;
}

const Sidebar: FC<SidebarProps> = ({ open }) => {
  const { sidebarOpen, toggleSidebar } = useAppContext();

  return (
    <div
      className={`top-0 p-5 absolute w-[300px] ${
        sidebarOpen ? "" : "-translate-x-[100%]"
      } left-0 bottom-0 transition-all shadow-md duration-100 ease-linear bottom-nav b-gray-800 z-10`}
    >
      <div>
        <div className="mb-5" onClick={() => toggleSidebar()}>
          <RiMenuFoldLine className="w-7 h-7 cursor-pointer" />
        </div>
        <div className="flex gap-2">
          <button className="rounded-full bg-yellow-600 flex-1 py-1">
            Deposit
          </button>
          <button className="rounded-full bg-blue-500 flex-1 py-1">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
