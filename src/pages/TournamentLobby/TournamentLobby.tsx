import React from "react";

interface Player {
  id: string;
  name: string;
  avatar?: string;
  rank?: string;
}

interface Match {
  id: string;
  player1: Player | null;
  player2: Player | null;
  winner?: Player;
  status: "scheduled" | "in_progress" | "completed";
  startTime?: string;
}

const TournamentLobby: React.FC = () => {
  const matches: Match[] = [
    {
      id: "1",
      player1: {
        id: "1",
        name: "DragonSlayer",
        rank: "Diamond",
        avatar: "https://api.dicebear.com/6.x/pixel-art/svg?seed=1",
      },
      player2: {
        id: "2",
        name: "CardMaster",
        rank: "Platinum",
        avatar: "https://api.dicebear.com/6.x/pixel-art/svg?seed=2",
      },
      status: "scheduled",
      startTime: "2:30 PM",
    },
    // ...more matches
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Tournament Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Weekend Tournament
              </h1>
              <p className="text-blue-300">Single Elimination - Round of 8</p>
            </div>
            <div className="text-center bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-blue-500/30 w-full sm:w-auto">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
                02:45:30
              </div>
              <div className="text-xs sm:text-sm text-blue-300">
                Until next match
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Progress */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between mb-8 overflow-x-auto">
          {["Round 1", "Quarter Finals", "Semi Finals", "Finals"].map(
            (round, index) => (
              <div
                key={round}
                className={`flex items-center ${index !== 3 ? "mr-4" : ""}`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    index === 0 ? "bg-green-500" : "bg-gray-600"
                  } mr-2`}
                />
                <span
                  className={`text-sm ${
                    index === 0 ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {round}
                </span>
              </div>
            )
          )}
        </div>

        {/* Matches Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-800/50 rounded-lg backdrop-blur-sm border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-300">Match #{match.id}</span>
                <div className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      match.status === "in_progress"
                        ? "bg-yellow-500"
                        : match.status === "completed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } mr-2`}
                  />
                  <span className="text-sm text-gray-400">
                    {match.startTime}
                  </span>
                </div>
              </div>

              {[match.player1, match.player2].map((player, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-3 bg-gray-700/50 rounded-lg mb-2"
                >
                  <img
                    src={player?.avatar}
                    alt={player?.name}
                    className="w-10 h-10 rounded-full bg-gray-600"
                  />
                  <div className="ml-3">
                    <div className="text-white font-medium">
                      {player?.name || "TBD"}
                    </div>
                    {player?.rank && (
                      <div className="text-sm text-gray-400">{player.rank}</div>
                    )}
                  </div>
                  {match.winner?.id === player?.id && (
                    <div className="ml-auto">
                      <div className="text-green-500 text-sm font-medium">
                        Winner
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentLobby;
