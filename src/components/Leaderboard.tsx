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
    <div className="w-full h-[300px]  flex flex-col px- rounded-md shadow-lg drop-shadow-lg mt-5 ">
      <div className="p-2 flex gap-2 bg-[#FFFFFF1A]">
        <div className="w-7 h-7">
          <img className="w-full h-full object-contain" src={crown} alt="" />
        </div>
        <h2 className="font-bold flex-1">Leaderboard</h2>
        <p className="cursor-pointer">More</p>
      </div>
      <div className="overflow-y-scroll">
        {topPlayers.map((player, index) => (
          <LeaderboardItem key={index} index={index} name={player} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
