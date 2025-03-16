import React from "react";

const RecentGames: React.FC = () => {
  const games = [
    {
      id: 1,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster123", score: 18 },
      result: "win",
      time: "15m ago",
      type: "Ranked",
    },
    {
      id: 2,
      player1: { name: "You", score: 15 },
      player2: { name: "PokerQueen", score: 21 },
      result: "loss",
      time: "1h ago",
      type: "Tournament",
    },
    {
      id: 3,
      player1: { name: "You", score: 21 },
      player2: { name: "AceHunter", score: 19 },
      result: "win",
      time: "2h ago",
      type: "Casual",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Recent Games</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {games.map((game) => (
          <div
            key={game.id}
            className="p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    game.result === "win" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-xs font-medium px-2 py-1 rounded bg-gray-700 text-gray-300">
                  {game.type}
                </span>
              </div>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white font-medium">
                    {game.player1.name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {game.player1.score} - {game.player2.score}
                  </span>
                  <span className="text-white font-medium">
                    {game.player2.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {game.time}
                </span>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700">
        <button className="text-blue-400 hover:text-blue-300 text-sm w-full text-center">
          View Match History
        </button>
      </div>
    </div>
  );
};

export default RecentGames;
