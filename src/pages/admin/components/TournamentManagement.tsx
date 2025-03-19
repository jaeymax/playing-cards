import React, { useState } from "react";

interface Tournament {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  maxPlayers: number;
  currentPlayers: number;
  status: "upcoming" | "active" | "completed" | "cancelled";
  format: "single" | "double" | "round-robin";
  prizePool: number;
  entryFee: number;
}

const TournamentManagement: React.FC = () => {
  const [tournaments] = useState<Tournament[]>([
    {
      id: 1,
      name: "Winter Championship 2024",
      startDate: new Date("2024-01-25"),
      endDate: new Date("2024-01-27"),
      maxPlayers: 128,
      currentPlayers: 96,
      status: "upcoming",
      format: "single",
      prizePool: 5000,
      entryFee: 50,
    },
    {
      id: 2,
      name: "Weekly Pro Series",
      startDate: new Date("2024-01-22"),
      endDate: new Date("2024-01-22"),
      maxPlayers: 64,
      currentPlayers: 64,
      status: "active",
      format: "double",
      prizePool: 1000,
      entryFee: 20,
    },
    {
      id: 3,
      name: "New Year's Tournament",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-02"),
      maxPlayers: 256,
      currentPlayers: 232,
      status: "completed",
      format: "single",
      prizePool: 10000,
      entryFee: 100,
    },
    {
      id: 4,
      name: "Beginner's Arena",
      startDate: new Date("2024-01-28"),
      endDate: new Date("2024-01-28"),
      maxPlayers: 32,
      currentPlayers: 12,
      status: "upcoming",
      format: "single",
      prizePool: 250,
      entryFee: 5,
    },
    {
      id: 5,
      name: "Elite Masters Challenge",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-03"),
      maxPlayers: 16,
      currentPlayers: 8,
      status: "upcoming",
      format: "round-robin",
      prizePool: 15000,
      entryFee: 200,
    },
  ]);

  const getStatusStyle = (status: Tournament["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-400";
      case "active":
        return "bg-green-500/10 text-green-400";
      case "completed":
        return "bg-gray-500/10 text-gray-400";
      case "cancelled":
        return "bg-red-500/10 text-red-400";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Tournament Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-4 py-3 text-left">Tournament</th>
              <th className="px-4 py-3 text-left">Dates</th>
              <th className="px-4 py-3 text-left">Players</th>
              <th className="px-4 py-3 text-left">Format</th>
              <th className="px-4 py-3 text-left">Prize Pool</th>
              <th className="px-4 py-3 text-left">Entry Fee</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tournaments.map((tournament) => (
              <tr key={tournament.id} className="hover:bg-gray-750">
                <td className="px-4 py-3 font-medium">{tournament.name}</td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div>{tournament.startDate.toLocaleDateString()}</div>
                    <div className="text-gray-400">to</div>
                    <div>{tournament.endDate.toLocaleDateString()}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>
                      {tournament.currentPlayers}/{tournament.maxPlayers}
                    </span>
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${
                            (tournament.currentPlayers /
                              tournament.maxPlayers) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{tournament.format}</td>
                <td className="px-4 py-3">${tournament.prizePool}</td>
                <td className="px-4 py-3">${tournament.entryFee}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs capitalize ${getStatusStyle(
                      tournament.status
                    )}`}
                  >
                    {tournament.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20">
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TournamentManagement;
