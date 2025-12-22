import React from "react";

interface Player {
  name: string;
  avatar: string;
  score: number;
}

interface Match {
  player1: Player;
  player2: Player;
  winner?: "player1" | "player2";
}

const TournamentBracket: React.FC = () => {
  // Sample tournament data
  const tournamentData: Match[][] = [
    [
      {
        player1: {
          name: "Alice",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
          score: 3,
        },
        player2: {
          name: "Bob",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
          score: 1,
        },
        winner: "player1",
      },
      {
        player1: {
          name: "Charlie",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
          score: 2,
        },
        player2: {
          name: "Diana",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
          score: 0,
        },
        winner: "player1",
      },
      {
        player1: {
          name: "Eve",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
          score: 3,
        },
        player2: {
          name: "Frank",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
          score: 2,
        },
        winner: "player1",
      },
      {
        player1: {
          name: "Grace",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
          score: 1,
        },
        player2: {
          name: "Henry",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
          score: 3,
        },
        winner: "player2",
      },
    ],
    [
      {
        player1: {
          name: "Alice",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
          score: 3,
        },
        player2: {
          name: "Charlie",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
          score: 1,
        },
        winner: "player1",
      },
      {
        player1: {
          name: "Eve",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
          score: 2,
        },
        player2: {
          name: "Henry",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
          score: 3,
        },
        winner: "player2",
      },
    ],
    [
      {
        player1: {
          name: "Alice",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
          score: 3,
        },
        player2: {
          name: "Henry",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
          score: 1,
        },
        winner: "player1",
      },
    ],
  ];

  const renderRoundName = (round: number) => {
    const names = ["Quarter Finals", "Semi Finals", "Finals", "Champion"];
    return names[round - 1] || "Round " + round;
  };

  const PlayerRow: React.FC<{ player: Player; isWinner: boolean }> = ({
    player,
    isWinner,
  }) => (
    <div
      className={`flex items-center justify-between p-2 rounded-md transition-colors ${
        isWinner ? "bg-gray-700 border border-amber-500/30" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={player.avatar}
          alt={player.name}
          className="w-8 h-8 rounded-full border border-gray-600 flex-shrink-0"
        />
        <span className="text-white font-medium text-sm truncate">
          {player.name}
        </span>
      </div>
      <span
        className={`text-sm font-semibold flex-shrink-0 ml-2 ${
          isWinner ? "text-amber-400" : "text-gray-400"
        }`}
      >
        {player.score}
      </span>
    </div>
  );

  return (
    <div className="relative">
      {/* Mobile View */}
      <div className="lg:hidden space-y-8">
        {[1, 2, 3, 4].map((round) => (
          <div key={round} className="w-full">
            <h3 className="text-sm font-medium text-gray-400 mb-4 text-center">
              {renderRoundName(round)}
            </h3>
            <div className="space-y-4 px-2">
              {tournamentData[round - 1]?.map((match, i) => (
                <div
                  key={i}
                  className="bg-gray-750 rounded-lg border border-gray-700 p-4 shadow-lg hover:border-gray-600 transition-colors"
                >
                  <div className="space-y-3">
                    <PlayerRow
                      player={match.player1}
                      isWinner={match.winner === "player1"}
                    />
                    <div className="border-t border-gray-700"></div>
                    <PlayerRow
                      player={match.player2}
                      isWinner={match.winner === "player2"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[800px] p-4">
          <div className="flex justify-between gap-4">
            {[1, 2, 3, 4].map((round) => (
              <div key={round} className="flex-1">
                <h3 className="text-center text-sm font-medium text-gray-400 mb-6">
                  {renderRoundName(round)}
                </h3>

                <div className="space-y-8">
                  {tournamentData[round - 1]?.map((match, i) => (
                    <div key={i} className="px-2">
                      <div className="bg-gray-750 rounded-lg border border-gray-700 p-4 shadow-lg hover:border-gray-600 transition-colors">
                        <div className="space-y-3">
                          <PlayerRow
                            player={match.player1}
                            isWinner={match.winner === "player1"}
                          />
                          <div className="border-t border-gray-700"></div>
                          <PlayerRow
                            player={match.player2}
                            isWinner={match.winner === "player2"}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;
