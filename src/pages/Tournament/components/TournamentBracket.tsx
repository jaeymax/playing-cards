import React from "react";

interface Player {
  name: string;
  image_url: string;
  score: number;
  winner: boolean;
}

interface Match {
  id: number;
  player1: Player;
  player2: Player;
  status: string;
  game_id: number;
  game_code: string;
  winner_id: number | null;
}

interface Round {
  round: number;
  matches: Match[];
}

interface TournamentBracketProps {
  rounds?: Round[];
  numberOfParticipants?: number;
  loading?: boolean;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({
  rounds = [],
  numberOfParticipants = 0,
  loading = false,
}) => {
  const calculateTotalRounds = (participants: number): number => {
    if (participants <= 1) return 0;
    return Math.ceil(Math.log2(participants));
  };

  const totalRounds = calculateTotalRounds(numberOfParticipants);
  const roundsMap = new Map(rounds.map((r) => [r.round, r]));

  const renderRoundName = (round: number) => {
    const roundsFromEnd = totalRounds - round;
    if (roundsFromEnd === 0) return "Finals";
    if (roundsFromEnd === 1) return "Semi Finals";
    if (roundsFromEnd === 2) return "Quarter Finals";
    return "Round " + round;
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
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          {player.image_url ? (
            <img
              className="object-cover w-full h-full rounded-full"
              src={player.image_url}
              alt={player.name}
            />
          ) : (
            <span className="text-sm text-white">👤</span>
          )}
        </div>
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

  const MatchStatus: React.FC<{ status: string }> = ({ status }) => {
    const statusConfig = {
      pending: {
        label: "Pending",
        bgColor: "bg-gray-500/10",
        textColor: "text-gray-400",
      },
      in_progress: {
        label: "In Progress",
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-400",
      },
      completed: {
        label: "Completed",
        bgColor: "bg-green-500/10",
        textColor: "text-green-400",
      },
      forfeited: {
        label: "Forfeited",
        bgColor: "bg-red-500/10",
        textColor: "text-red-400",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-2 py-1 text-xs font-medium ${config.bgColor} ${config.textColor} rounded`}
      >
        {config.label}
      </span>
    );
  };

  const WaitingPlaceholder: React.FC = () => (
    <div className="bg-gray-750 rounded-lg border border-dashed border-gray-600 p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-center h-8 rounded-md bg-gray-700/50">
          <span className="text-gray-500 text-xs font-medium">Waiting...</span>
        </div>
        <div className="border-t border-gray-700"></div>
        <div className="flex items-center justify-center h-8 rounded-md bg-gray-700/50">
          <span className="text-gray-500 text-xs font-medium">Waiting...</span>
        </div>
      </div>
    </div>
  );

  const BracketSkeleton: React.FC = () => (
    <div className="space-y-8 px-2">
      {Array.from({ length: 3 }).map((_, roundIndex) => (
        <div key={roundIndex} className="space-y-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24 mx-auto"></div>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, matchIndex) => (
              <div
                key={matchIndex}
                className="bg-gray-750 rounded-lg border border-gray-700 p-4"
              >
                <div className="mb-3 h-6 bg-gray-700 rounded animate-pulse w-16"></div>
                <div className="space-y-3">
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                  <div className="border-t border-gray-700"></div>
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="relative">
        {/* Mobile View */}
        <div className="lg:hidden">
          <BracketSkeleton />
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="min-w-[800px] p-4">
            <div className="flex justify-between gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex-1">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-24 mx-auto mb-6"></div>
                  <div className="space-y-8">
                    {Array.from({ length: 2 }).map((_, matchIndex) => (
                      <div key={matchIndex} className="px-2">
                        <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                          <div className="mb-3 h-6 bg-gray-700 rounded animate-pulse w-16"></div>
                          <div className="space-y-3">
                            <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                            <div className="border-t border-gray-700"></div>
                            <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
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
  }

  return (
    <div className="relative">
      {/* Mobile View */}
      <div className="lg:hidden space-y-8">
        {Array.from({ length: totalRounds }).map((_, index) => {
          const roundNumber = index + 1;
          const roundData = roundsMap.get(roundNumber);

          return (
            <div key={roundNumber} className="w-full">
              <h3 className="text-sm font-medium text-gray-400 mb-4 text-center">
                {renderRoundName(roundNumber)}
              </h3>
              <div className="space-y-4 px-2">
                {roundData ? (
                  roundData.matches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-gray-750 rounded-lg border border-gray-700 p-4 shadow-lg hover:border-gray-600 transition-colors"
                    >
                      <div className="mb-3">
                        <MatchStatus status={match.status} />
                      </div>
                      <div className="space-y-3">
                        <PlayerRow
                          player={match.player1}
                          isWinner={match.player1.winner}
                        />
                        {match.player2?.name && (
                          <>
                            <div className="border-t border-gray-700"></div>
                            <PlayerRow
                              player={match.player2}
                              isWinner={match.player2.winner}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <WaitingPlaceholder />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[800px] p-4">
          <div className="flex justify-between gap-4">
            {Array.from({ length: totalRounds }).map((_, index) => {
              const roundNumber = index + 1;
              const roundData = roundsMap.get(roundNumber);

              return (
                <div key={roundNumber} className="flex-1">
                  <h3 className="text-center text-sm font-medium text-gray-400 mb-6">
                    {renderRoundName(roundNumber)}
                  </h3>

                  <div className="space-y-8">
                    {roundData ? (
                      roundData.matches.map((match) => (
                        <div key={match.id} className="px-2">
                          <div className="bg-gray-750 rounded-lg border border-gray-700 p-4 shadow-lg hover:border-gray-600 transition-colors">
                            <div className="mb-3">
                              <MatchStatus status={match.status} />
                            </div>
                            <div className="space-y-3">
                              <PlayerRow
                                player={match.player1}
                                isWinner={match.player1.winner}
                              />
                              {match.player2?.name && (
                                <>
                                <div className="border-t border-gray-700"></div>
                              <PlayerRow
                                player={match.player2}
                                isWinner={match.player2.winner}
                              />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <WaitingPlaceholder />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;
