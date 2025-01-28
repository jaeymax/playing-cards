//<a href="https://www.flaticon.com/free-icons/best-friend" title="best friend icons">Best friend icons created by Freepik - Flaticon</a>

import Sidebar from "./components/Sidebar";
import { FC, useEffect, useState } from "react";
import BottomNavbar from "./components/BottomNavbar";
import Navbar from "./components/Navbar";

import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import Deposit from "./pages/Deposit";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { socket } from "./socket";

interface HomeProps {}

const Main: FC<HomeProps> = () => {
  const { activeTab, loginOpen, signupOpen } = useAppContext();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("message", (data) => {
      console.log(data);
    });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="p- flex-1 flex flex-col relative b-[url('https://aeadmin.adamellis.com/wp-content/uploads/2023/10/adam-ellis-wallpaper-playing-cards-landscape-full-artwork.jpg')]">
      <Navbar />
      {loginOpen && <Login />}
      {signupOpen && <Signup />}
      <Sidebar />
      {activeTab === "home" && <Home />}
      {activeTab === "deposit" && <Deposit />}
      {activeTab === "support" && <Support />}
      {activeTab === "profile" && <Profile />}
      {activeTab === "chat" && <Chat />}
      <div
        className={`${
          isConnected ? "bg-green-600" : "bg-red-500"
        } fixed bottom-0 left-0 py-1 px-2 font-bold`}
      >
        {isConnected ? "Connected" : "Reconnecting"}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Main;
