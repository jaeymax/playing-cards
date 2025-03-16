import React from "react";

const Participants: React.FC = () => {
  const participants = [
    {
      id: 1,
      name: "CardMaster123",
      rank: "#1",
      status: "qualified",
      wins: 3,
      losses: 0,
    },
    {
      id: 2,
      name: "AceHunter",
      rank: "#4",
      status: "qualified",
      wins: 2,
      losses: 1,
    },
    {
      id: 3,
      name: "PokerQueen",
      rank: "#2",
      status: "eliminated",
      wins: 1,
      losses: 2,
    },
    // Add more participants...
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Record
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {participants.map((player) => (
            <tr key={player.id} className="hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {player.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {player.rank}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    player.status === "qualified"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {player.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {player.wins}W - {player.losses}L
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Participants;
