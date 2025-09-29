import { baseUrl } from "@/config/api";
import React, { useEffect } from "react";
import { getDivision } from "@/utils/Functions";

const TopPlayers: React.FC = () => {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const topPlayers = async () => {
      try {
        const response = await fetch(`${baseUrl}/leaderboard/topplayers`);
        const data = await response.json();
        setPlayers(data);
      } finally {
        setLoading(false);
      }
    };
    topPlayers();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Top Players</h2>
      </div>
      <div className="p-4 space-y-4">
        {loading
          ? [...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 animate-pulse"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-700 rounded w-16 mt-2"></div>
                </div>
              </div>
            ))
          : players.map((player, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index + 1 === 1
                      ? "bg-yellow-500"
                      : index + 1 === 2
                      ? "bg-gray-400"
                      : index + 1 === 3
                      ? "bg-orange-600"
                      : "bg-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <img className="object-contain rounded-full" src={player.image_url} alt={player.username} />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">
                    {player.username}
                  </div>
                  <div className="text-sm text-gray-400">
                    {player.rating} pts
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopPlayers;
