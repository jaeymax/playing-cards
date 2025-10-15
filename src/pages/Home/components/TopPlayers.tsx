import { baseUrl } from "@/config/api";
import React, { useEffect } from "react";

interface Player {
  username: string;
  rating: number;
  image_url: string | null;
  rank: number;
}

const TopPlayers: React.FC = () => {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchTopPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/leaderboard/topplayers`);
      if (!response.ok) {
        throw new Error(
          response.status === 500
            ? "Network error. Please check your internet connection."
            : "Failed to fetch leaderboard"
        );
      }
      const data = await response.json();
      setPlayers(data);
    } catch (error: any) {
      console.error("Error fetching top players:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPlayers();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Top Players</h2>
      </div>
      <div className="p-4 space-y-4">
        {loading ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-24"></div>
                <div className="h-3 bg-gray-700 rounded w-16 mt-2"></div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchTopPlayers}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          players.map((player, index) => (
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
                {player.rank}
              </div>
              <div className="w-8 h-8 bg-gray-700/30 rounded-full flex items-center justify-center">
                {player.image_url ? (
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={player.image_url}
                    alt={player.username}
                  />
                ) : (
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png" alt={player.username} className="object-cover w-full h-full rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{player.username}</div>
                <div className="text-sm text-gray-400">{player.rating} pts</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopPlayers;
