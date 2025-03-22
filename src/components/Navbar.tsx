import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cards.png";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAppContext } from "../contexts/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import menuLogo from "../assets/menu.png";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { user, setActiveTabState } = useAppContext();

  const navigate = useNavigate();

  const { sidebarOpen, toggleSidebar, updateLoginOpen, updateSignupOpen } =
    useAppContext();

  return (
    <nav className="flex bg-gray-900 px-5 py-8 w-full gap-4 h-14  items-center shadow-m">
      <div className="lg:hidden" onClick={() => toggleSidebar()}>
        {sidebarOpen ? (
          <div className="w-7 h-7">
            <img
              src={menuLogo}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        ) : (
          // <RiMenuFoldLine className="w-7 h-7 cursor-pointer" />
          // <RiMenuFold2Line className="w-7 h-7 cursor-pointer" />
          <div className="w-7 h-6 cursor-pointer">
            <img
              src={menuLogo}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        )}
      </div>

      <Link to={"/"} className="flex items-center gap-5 mr-12">
        <div className="w-10 h-10">
          <img className="w-full h-full object-contain" src={logo} alt="" />
        </div>
        <h1 className="items-center hidden sm:flex font-extrabold text-2xl">
          PlaySpa.<span className="text-[#81b64c]">com</span>
        </h1>
      </Link>
      {/* <div className="flex gap-5 flex-1 hidden md:flex">
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
      </div> */}
      <div className="flex gap  borde border-green-500  items-center ml-auto">
        {user ? (
          <div className="flex gap-3 items-center ml-auto borde border-red-300">
            {/* <div className="w-20 bg-blue-950 rounded-full" >
                h
            </div> */}
            {/* <FaUserFriends className="w-5 h-5 cursor-pointer" /> */}
            <BsPeople
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/friends")}
            />
            {/* <IoMdNotifications className="w-5 h-5 cursor-pointer" /> */}
            <IoNotificationsOutline
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/notifications")}
            />

            {/* <IoMdMailOpen className="w-5 h-5 cursor-pointer" /> */}
            {/* <CiMail className="w-5 h-5 cursor-pointer" 
             onClick={()=>navigate("/mail")}
            /> */}

            <HiOutlineChatBubbleOvalLeftEllipsis
              className="w-5 h-5 cursor-pointer"
              onClick={() => setActiveTabState("chat")}
            />
            {/* <IoPersonSharp className="w-5 h-5 cursor-pointer" /> */}
            <div
              className="cursor-pointer ml-4"
              onClick={() => navigate("/profile")}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image_url} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        ) : (
          <div className="flex gap-2  w-[150px] items-center ml-auto">
            <button
              onClick={() => updateLoginOpen(true)}
              className="button flex-1  text-sm h-9 flex items-center rounded-sm shadow-md min-w-fit p- font-bold"
            >
              <p className="mx-auto">Log In</p>
            </button>
            <button
              onClick={() => updateSignupOpen(true)}
              className="bg-green-600 hover:bg-green-700 flex-1  text-sm rounded-sm p- flex items-center h-9 font-bold min-w-fit"
            >
              <p className="mx-auto">Sign Up</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
