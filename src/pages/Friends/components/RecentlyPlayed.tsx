import React from "react";

const RecentlyPlayed: React.FC = () => {
  const recentPlayers = [
    {
      id: "1",
      username: "DiamondKing",
      avatar: "♦️",
      result: "win",
      time: "2h ago",
    },
    {
      id: "2",
      username: "ClubMaster",
      avatar: "♣️",
      result: "loss",
      time: "3h ago",
    },
    {
      id: "3",
      username: "HeartQueen",
      avatar: "♥️",
      result: "win",
      time: "5h ago",
    },
  ];

  return (
    <div className="bg-gray-800  md:rounded-lg md:border md:border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Recently Played</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {recentPlayers.map((player) => (
          <div
            key={player.id}
            className="p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  {player.avatar}
                </div>
                <div>
                  <p className="text-white">{player.username}</p>
                  <p className="text-xs text-gray-400">{player.time}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  player.result === "win"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {player.result.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
