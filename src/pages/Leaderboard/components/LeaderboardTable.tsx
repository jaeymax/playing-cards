import React from "react";

interface LeaderboardTableProps {
  currentFilter: string;
  searchQuery: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  currentFilter,
  searchQuery,
}) => {


  currentFilter
  searchQuery

  const players = [
    {
      rank: 4,
      name: "SpadeKing",
      points: 2100,
      winRate: "65%",
      games: 150,
      avatar: "♣️",
    },
    {
      rank: 5,
      name: "DiamondPro",
      points: 2000,
      winRate: "62%",
      games: 120,
      avatar: "♦️",
    },
    // Add more players...
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Player
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Points
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Win Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                Games
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {players.map((player) => (
              <tr key={player.rank} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  #{player.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                      {player.avatar}
                    </div>
                    <span className="ml-3 text-white">{player.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {player.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {player.winRate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {player.games}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
