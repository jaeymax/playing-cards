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
    <div className="w-full h-[300px] z-10 bg-blu-500  flex flex-col rounded-md shadow-lg drop-shadow-lg  mt-5 ">
      <div className="p-2 flex gap-2 bg-[#FFFFFF1A] rounded-tl-md rounded-tr-md">
        <div className="w-7 h-7">
          <img className="w-full h-full object-contain" src={trophy} alt="" />
        </div>
        <h2 className="font-bold flex-1">Tournament winners</h2>
        <p className="cursor-pointer">More</p>
      </div>
      <div className="overflow-y-scroll custom-scroll">
        {winners.map((player, index) => (
          <TournamentWinnersItem key={index} index={index} name={player} />
        ))}
      </div>
    </div>
  )
}

export default TournamentWinners
