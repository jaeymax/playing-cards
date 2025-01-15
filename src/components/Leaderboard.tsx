import { Link } from "react-router-dom";
import crown from "../assets/crown.png";
import LeaderboardItem from "./LeaderboardItem";


const Leaderboard = () => {
  const topPlayers = [
    "Warrior",
    "Saviour",
    "Maxwell",
    "King",
    "Slayer",
    "Putty",
    "Witty",
    "Tony",
  ];

  return (
    <div className="w-full h-[300px] bg-bue-500 flex flex-col rounded-md shadow-lg drop-shadow-lg mt-5 ">
      <div className="p-2 flex gap-2 bg-re-500 rounded-tl-md rounded-tr-md bg-[#FFFFFF1A]">
        <div className="w-7 h-7">
          <img className="w-full h-full object-contain" src={crown} alt="" />
        </div>
        <h2 className="font-bold flex-1">Leaderboard</h2>
        <Link to = '/leaderboard' className="cursor-pointer hover:text-blue-500">More</Link>
      </div>
      <div className="overflow-y-scroll custom-scroll">
        {topPlayers.map((player, index) => (
          <LeaderboardItem key={index} index={index} name={player} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
