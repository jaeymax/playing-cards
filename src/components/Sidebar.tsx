import { FC, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import houseLogo from "../assets/house.png"
import learnLogo from "../assets/learn.png"
import socialLogo from "../assets/social.png"
import trophyLogo from "../assets/trophy.png";
import leaderboardLogo from '../assets/podium.png'
import { IoMdClose } from "react-icons/io";
import { Moon, Sun } from 'lucide-react';

interface SidebarProps {
  
}

const Sidebar: FC<SidebarProps> = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={` top-0 p-5 fixed w-[250px] ${
        sidebarOpen ? "" : "-translate-x-[100%]"
      } left-0 bottom-0 transition-all shadow-md duration-100 ease-linear sidebar z-10`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-5" onClick={() => toggleSidebar()}>
          <IoMdClose className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex flex-col gap- text-sm flex-1">
          {/* <button className="rounded-full bg-yellow-600 flex-1 py-1">
            Deposit
          </button>
          <button className="rounded-full bg-blue-500 flex-1 py-1">
            Withdraw
          </button> */} 
          <div className="font-bold flex gap-3 hover:bg-blue-500 cursor-pointer p-3" >
            <div className="w-5 h-5" >
              <img src={houseLogo} className="w-full h-full object-contain" alt="" />
            </div>
            <p>Home</p>
          </div>
          <div className="flex gap-3 hover:bg-blue-500 hover:rounded-sm cursor-pointer p-3" >
             <div className="w-5 h-5" >
              <img src={learnLogo} className="w-full h-full object-contain" alt="" />
            </div>
            <p>Learn</p>
          </div>
          <div className="flex gap-3 hover:bg-blue-500 cursor-pointer p-3" >
             <div className="w-5 h-5" >
              <img src={leaderboardLogo} className="w-full h-full object-contain" alt="" />
            </div>
            <p>Leaderboard</p>
          </div>
          <div className="flex gap-3 hover:bg-blue-500 cursor-pointer p-3" >
             <div className="w-5 h-5" >
              <img src={trophyLogo} className="w-full h-full object-contain" alt="" />
            </div>
            <p>Tournament</p>
          </div>
          <div className="flex gap-3 hover:bg-blue-500 cursor-pointer p-3" >
          <div className="w-5 h-5" >
              <img src={socialLogo} className="w-full h-full object-contain" alt="" />
            </div>
            <p>Social</p>
          </div>
        </div>
        {/* Theme Toggle Button */}
        <div className="flex items-center justify-start">
          <button
            onClick={toggleTheme}
            className={`
              w-20 h-10 rounded-full p-1 
              transition-colors duration-200
              ${theme === 'light' ? 'bg-blue-100' : 'bg-gray-700'}
              relative
            `}
            aria-label="Theme toggle"
          >
            {/* Track */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <Sun className={`w-4 h-4 text-yellow-500 transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-40'}`} />
              <Moon className={`w-4 h-4 text-blue-500 transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-40'}`} />
            </div>
            
            {/* Sliding Thumb */}
            <div
              className={`
                w-8 h-8 rounded-full 
                transition-all duration-200 ease-in-out
                flex items-center justify-center
                ${theme === 'light' 
                  ? 'translate-x-0 bg-yellow-500' 
                  : 'translate-x-10 bg-blue-500'
                }
                shadow-md
              `}
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
