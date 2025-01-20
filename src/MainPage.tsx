//<a href="https://www.flaticon.com/free-icons/best-friend" title="best friend icons">Best friend icons created by Freepik - Flaticon</a>

import Sidebar from "./components/Sidebar";
import { FC } from "react";
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


interface HomeProps {

}

const Main: FC<HomeProps> = () => {

  const { activeTab, loginOpen, signupOpen} = useAppContext();

  return (
    <div className="p- flex-1 flex flex-col relative b-[url('https://aeadmin.adamellis.com/wp-content/uploads/2023/10/adam-ellis-wallpaper-playing-cards-landscape-full-artwork.jpg')]">
      <Navbar />
      {loginOpen && <Login/>}
      {signupOpen && <Signup/>}
      <Sidebar />
      {activeTab === "home" && <Home />}
      {activeTab === "deposit" && <Deposit />}
      {activeTab === "support" && <Support />}
      {activeTab === "profile" && <Profile />}
      {activeTab === "chat" && <Chat/>}
      <BottomNavbar />
    </div>
  );
};

export default Main;
