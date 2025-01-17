
import inviteFriendLogo from '../assets/best-friend.png'
import robotLogo from '../assets/robot.png'
import playLogo from '../assets/play.png'
import starLogo from '../assets/star.png'
import Footer from "@/components/Footer";
import Leaderboard from "@/components/Leaderboard";
import TournamentWinners from '@/components/TournamentWinners'

const Home = () => {


  return (
    <div className="py-5 flex-1 gap-5 flex flex-col w-full mx-auto max-w-3xl px-2 b-[url('https://aeadmin.adamellis.com/wp-content/uploads/2023/10/adam-ellis-wallpaper-playing-cards-landscape-full-artwork.jpg')]">
      <div className="flex items-cente gap-16 borde sm:flex-row flex-col w-full max-w-[800px mx-auto flex-1">
        <div className="flex flex-col gap-3 items-center flex-1 borde">
          <h1 className="font-extrabold text-4xl text-center" >Play Cards Online on the #1 Site!</h1>
          <div className="bg-green-600 hover:bg-green-700 w-full text-center rounded p-2 hover:cursor-pointer shadow-md">
            <div className="flex gap-3 mx-auto w-fit items-center" >
                 <div className="w-6 h-6" >
                  <img className="w-full h-full object-cover" src={playLogo} alt="" />
                 </div>
                 <p>
                  Play game
                 </p>
            </div>
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
              <div className="flex gap-3 mx-auto w-fit items-center" >
                <div className="w-6 h-6" >
                  <img className="w-full h-full object-cover" src={starLogo} alt="" />
                </div>
                <p>
            Create game
                </p>
              </div>
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            <div className="flex gap-3 mx-auto w-fit items-center">
            <div className="w-6 h-6" >
              <img src={inviteFriendLogo} className="w-full h-full object-cover" alt="" />
            </div>
            <p  className="">
              Invite a friend
            </p>
            </div>
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            <div className="flex gap-3 mx-auto w-fit items-center" >
            <div className="w-6 h-6" >
              <img src={robotLogo} className="w-full h-full object-cover" alt="" />
            </div>
            <p>
            Play with Computer
            </p>
            </div>
          </div>
          <div className="flex justify-between items-center borde w-full">
            <p className="font-bold text-xs">
              13533<span className="font-normal"> players</span>
            </p>
            <p className="font-bold text-xs">
              4844972 <span className="font-normal"> playing now</span>
            </p>
          </div>
        </div>
        <div className="p- flex-1">
          <Leaderboard/>
        </div>
      </div>
      <div className="flex gap-14 borde sm:flex-row items-cente flex-col" >
        <div className="w-[100px h-[100px borde flex-1" >
        <img className="rounded-md shadow-md object-contain" src={"https://i.pinimg.com/originals/73/8a/f6/738af624ab6799643747e5099e622cce.gif"} alt="" />
        </div>
        <TournamentWinners/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
