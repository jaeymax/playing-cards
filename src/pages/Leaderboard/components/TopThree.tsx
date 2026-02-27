import React from "react";

interface TopThreeProps {
  currentFilter: string;
  topPlayers?: {
    rank: number;
    username: string;
    rating: number;
    win_rate: number;
    image_url: string;
  }[];
}

const TopThree: React.FC<TopThreeProps> = ({ currentFilter, topPlayers }) => {

  currentFilter

  // const topPlayers = [
  //   { rank: 2, name: "PokerQueen", points: 2350, winRate: "75%", avatar: "🎭" },
  //   {
  //     rank: 1,
  //     name: "CardMaster123",
  //     points: 2500,
  //     winRate: "80%",
  //     avatar: "👑",
  //   },
  //   { rank: 3, name: "AceHunter", points: 2200, winRate: "70%", avatar: "♠️" },
  // ].sort((a, b) => a.rank - b.rank);

  return (
    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {topPlayers?.map((player) => (
        <div
          key={player.rank}
          className={`relative bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center transform transition hover:scale-[1.02] ${
            player.rank == 1 ? "md:-mt-4" : ""
          }`}
        >
          <div
            className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              player.rank == 1
                ? "bg-yellow-500"
                : player.rank == 2
                ? "bg-gray-400"
                : "bg-orange-600"
            }`}
          >
            {player.rank}
          </div>

          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1 mb-4">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-3xl">
              {player.image_url ? (
                <img
                  src={player.image_url}
                  alt={`${player.username}'s avatar`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{player.username}</h3>
          <div className="text-gray-400 text-sm space-y-1 text-center">
            <p>{player.rating} Points</p>
            <p>{Math.round(player.win_rate)}% Win Rate</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopThree;
