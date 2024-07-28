import TournamentWinnersItem from "./TournamentWinnersItem";
import trophy from '../assets/trophy.png'

const TournamentWinners = () => {

    const winners = [
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
    <div className="w-full h-[300px]  flex flex-col px- rounded-md shadow-lg drop-shadow-lg border  border-gray-600  mt-5 ">
      <div className="p-2 flex gap-2 bg-[#FFFFFF1A]">
        <div className="w-7 h-7">
          <img className="w-full h-full object-contain" src={trophy} alt="" />
        </div>
        <h2 className="font-bold flex-1">Tournament winners</h2>
        <p className="cursor-pointer">More</p>
      </div>
      <div className="overflow-y-scroll">
        {winners.map((player, index) => (
          <TournamentWinnersItem key={index} index={index} name={player} />
        ))}
      </div>
    </div>
  )
}

export default TournamentWinners
