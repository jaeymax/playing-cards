import React from "react";

const TopPlayers: React.FC = () => {
  const players = [
    { rank: 1, name: "CardMaster123", points: 2500, avatar: "👑" },
    { rank: 2, name: "PokerQueen", points: 2350, avatar: "🎭" },
    { rank: 3, name: "AceHunter", points: 2200, avatar: "♠️" },
    { rank: 4, name: "SpadeKing", points: 2100, avatar: "♣️" },
    { rank: 5, name: "DiamondPro", points: 2000, avatar: "♦️" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Top Players</h2>
      </div>
      <div className="p-4 space-y-4">
        {players.map((player) => (
          <div key={player.rank} className="flex items-center gap-4">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                player.rank === 1
                  ? "bg-yellow-500"
                  : player.rank === 2
                  ? "bg-gray-400"
                  : player.rank === 3
                  ? "bg-orange-600"
                  : "bg-gray-700"
              }`}
            >
              {player.rank}
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              {player.avatar}
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">{player.name}</div>
              <div className="text-sm text-gray-400">{player.points} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlayers;
