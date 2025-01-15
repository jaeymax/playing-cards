import { Link } from "react-router-dom";
import logo from "../assets/cards.png";
import { RiMenuFold2Line } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { IoMdMailOpen } from "react-icons/io";
import { useAppContext } from "../contexts/AppContext";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  user: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { sidebarOpen, toggleSidebar } = useAppContext();

  return (
    <nav className="flex header px-5 b-gray-800 w-full gap-4 py- h-14  items-center shadow-md">
      <div className="lg:hidden" onClick={() => toggleSidebar()}>
        {sidebarOpen ? (
          <RiMenuFoldLine className="w-7 h-7 cursor-pointer" />
        ) : (
          <RiMenuFold2Line className="w-7 h-7 cursor-pointer" />
        )}
      </div>

      <Link to={"/"} className="flex items-center gap-5 mr-12">
        <div className="w-10 h-10">
          <img className="w-full h-full object-contain" src={logo} alt="" />
        </div>
        <h1 className="items-center hidden sm:flex font-extrabold text-2xl">
          Playingcards.<span className="text-[#81b64c]">com</span>
        </h1>
      </Link>
      <div className="flex gap-5 flex-1 hidden md:flex">
        <Link to="/" className="font-medium">
          Play
        </Link>
        <Link to={"/"} className="font-medium">
          Watch
        </Link>
        <Link to="/" className="font-medium">
          Learn
        </Link>
        <Link to={"/"} className="font-medium">
          Community
        </Link>
        <Link to="/" className="font-medium">
          Tools
        </Link>
      </div>
      <div className="flex gap-2 w-[200px borde border-green-500  items-center ml-auto">
        {user ? (
          <div className="flex gap-3 items-center ml-auto borde border-red-300">
            {/* <div className="w-20 bg-blue-950 rounded-full" >
                h
            </div> */}
            <FaUserFriends className="w-5 h-5 cursor-pointer" />
            <IoMdNotifications className="w-5 h-5 cursor-pointer" />
            <IoMdMailOpen className="w-5 h-5 cursor-pointer" />
            {/* <IoPersonSharp className="w-5 h-5 cursor-pointer" /> */}
            <div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        ) : (
          <div className="flex gap-2  w-[200px] items-center ml-auto">
            <button className="border border-green-500 flex-1  text-sm border-gray-400 h-9 flex items-center rounded-sm min-w-fit p-2 font-bold">
              <p className="mx-auto text-green-500">Login</p>
            </button>
            <button className="bg-green-500 flex-1  text-sm rounded-sm p-2 flex items-center h-9 font-bold min-w-fit">
              <p className="mx-auto">Register</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
