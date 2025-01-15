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

interface HomeProps {

}

const Main: FC<HomeProps> = () => {
  // const playOptions = [
  //   {
  //     imageUrl: playCards,
  //     option: "PLAY GAME",
  //   },
  //   {
  //     imageUrl: createGame,
  //     option: "CREATE GAME",
  //   },
  //   {
  //     imageUrl: friendLogo,
  //     option: "INVITE A FRIEND",
  //   },
  //   {
  //     imageUrl: bot,
  //     option: "PLAY WITH COMPUTER",
  //   },
  // ];

  // const [open, setOpen] = useState(false);
  const { activeTab} = useAppContext();

  return (
    <div className="p- flex-1 flex flex-col relative b-[url('https://aeadmin.adamellis.com/wp-content/uploads/2023/10/adam-ellis-wallpaper-playing-cards-landscape-full-artwork.jpg')]">
      <Navbar user={true} />
      <Sidebar />
      {/* <div className='flex gap-10' >
        <div className=' flex-1' >
          <img className='object-contain w-full h-full' src={playingWithFriendsImage} />
        </div>
      <div className='flex items-center gap-5 flex-col flex-1' >
        {
          playOptions.map((item, index)=><PlayOptionItem key={index} index = {index} imageUrl={item.imageUrl} playOption={item.option} />)
        }  
      </div>
      </div> */}
      {/* <Leaderboard/>
      <TournamentWinners/> */}
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
