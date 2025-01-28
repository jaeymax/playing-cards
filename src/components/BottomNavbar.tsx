import { FaHome } from "react-icons/fa";
import { PiHandDeposit } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { useAppContext } from "../contexts/AppContext";
import { BsChatDotsFill } from "react-icons/bs";

const BottomNavbar = () => {

  const {setActiveTabState, activeTab} = useAppContext();

  const tabs = [
    {
      name: "home",
      icon: activeTab === "home"? <FaHome className="w-9 h-6 fill-green-600" />: <FaHome className="w-9 h-6" />,
    },
    {
      name: "deposit",
      icon: activeTab === "deposit"? <PiHandDeposit className="w-9 h-6 fill-green-600" />:<PiHandDeposit className="w-9 h-6" />,
    },
    {
      name: "support",
      icon: activeTab === "support"? <BiSupport className="w-9 h-6 fill-green-600" />: <BiSupport className="w-9 h-6" />
    },
    {
        name:"chat",
        icon: activeTab === "chat"?<BsChatDotsFill className="w-9 h-6 fill-green-600" /> : <BsChatDotsFill className="w-9 h-6" />
    }
  ];

  return (
    <nav className="sm:hidden flex hidden items-center shadow- fixed bottom-0 left-0 justify-between right-0 bottom-nav b-gray-800">
      {tabs.map((tab, index) => (
        <div onClick={()=>setActiveTabState(tab.name)}
          key={index}
          className="flex flex-col flex-1 items-center px-5 py-2 cursor-pointer"
        >
          <div className="fill-blue-500">{tab.icon}</div>
          <p className="text-sm capitalize">{tab.name}</p>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavbar;
