import React from "react";

interface Participant {
  id: number;
  username: string;
  image_url: string;
  rank: string;
  status: string;
  wins: number;
  losses: number;
}

interface ParticipantsProps {
  participants: Participant[] | undefined;
  loading?: boolean;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  loading = false,
}) => {
  const ParticipantsSkeleton: React.FC = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
                  <div className="ml-4 space-y-2 w-32">
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-6 bg-gray-700 rounded animate-pulse w-20"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return <ParticipantsSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {participants?.map((player) => (
            <tr key={player.id} className="hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    {player.image_url ? (
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={player.image_url}
                        alt={player.username}
                      />
                    ) : (
                      <span className="text-sm text-white">👤</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {player.username}
                    </div>
                  </div>
                </div>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Participants;
