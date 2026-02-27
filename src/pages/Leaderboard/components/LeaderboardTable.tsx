import React from "react";

interface LeaderboardTableProps {
  currentFilter: string;
  searchQuery: string;
  players: any[];
  loading: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  currentFilter,
  searchQuery,
  players,
  loading,
}) => {
  currentFilter;
  searchQuery;




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
    <div className="bg-gray-800 md:rounded-lg md:border border-gray-700">
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
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Win Rate
              </th>
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
                  <tr key={index} className="hover:bg-gray-750">
                    <td className="pl-6 borde py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      #{player.rank}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                          {player.image_url ? (
                            <img
                              className="rounded-full w-full h-full object-cover"
                              src={player.image_url}
                              alt={player.username}
                            />
                          ) : (
                            <img
                              className="rounded-full w-full h-full object-cover"
                              src={
                                "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                              }
                              alt=""
                            />
                          )}
                        </div>
                        <span className="ml-3 text-white">
                          {player.username.length > 10
                            ? player.username.slice(0, 10) + "..."
                            : player.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-300">
                      {player.rating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {Math.round(player.win_rate)}%
                  </td>
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
