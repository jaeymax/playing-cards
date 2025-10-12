import { baseUrl } from "@/config/api";
import React, { useEffect } from "react";

interface LeaderboardTableProps {
  currentFilter: string;
  searchQuery: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  currentFilter,
  searchQuery,
}) => {
  currentFilter;
  searchQuery;

  const [players, setPlayers] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    // Fetch player data from the API
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${baseUrl}/leaderboard`);
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
        console.log("players", data);
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // const players = [
  //   {
  //     rank: 4,
  //     name: "SpadeKing",
  //     points: 2100,
  //     winRate: "65%",
  //     games: 150,
  //     avatar: "♣️",
  //   },
  //   {
  //     rank: 5,
  //     name: "DiamondPro",
  //     points: 2000,
  //     winRate: "62%",
  //     games: 120,
  //     avatar: "♦️",
  //   },
  //   // Add more players...
  // ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pl-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Rank
              </th>
              <th className="px-1 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Player
              </th>
              <th className="px-1 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Points
              </th>
              {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Win Rate
              </th> */}
              {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Games
              </th> */}
              {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase"></th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading
              ? // Skeleton loading rows
                [...Array(5)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="hover:bg-gray-750">
                    <td className="pl-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-8 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
                        <div className="ml-3 h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              : players.map((player: any, index: number) => (
                  <tr key={player.rank} className="hover:bg-gray-750">
                    <td className="pl-6 borde py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      #{index + 1}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                          {player.image_url ? (
                            <img
                              className="rounded-full w-full h-full object-contain"
                              src={player.image_url}
                              alt={player.username}
                            />
                          ) : (
                            <img
                              className="rounded-full"
                              src={
                                "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                              }
                              alt=""
                            />
                          )}
                        </div>
                        <span className="ml-3 text-white">
                          {player.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-300">
                      {player.rating}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {player.winRate}
                  </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {player.games}
                  </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      View Profile
                    </button>
                  </td> */}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
