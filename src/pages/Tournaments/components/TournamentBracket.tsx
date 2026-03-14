import React from "react";
import { TournamentRound } from "../types";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
//import { Player } from "@/types/tournament";

interface TournamentBracketProps {
  rounds?: TournamentRound[]; // Assuming this type is defined in your types file
  numberOfParticipants?: number;
  tournamentFormat?: string;
  loading?: boolean;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({
  rounds,
  numberOfParticipants,
  tournamentFormat,
  loading,
}) => {

   const calculateTotalRounds = (participants: number): number => {
      if (participants <= 1) return 0;
      return Math.ceil(Math.log2(participants));
    };
  
    const totalRounds = calculateTotalRounds(numberOfParticipants as number);
    const roundsMap = new Map(rounds?.map((r) => [r.round, r]));
    console.log('roundsMap', roundsMap);
  
    const renderRoundName = (round: number) => {
      if (tournamentFormat == "Swiss") {
        return "Round " + round;
      }
      const roundsFromEnd = totalRounds - round;
      if (roundsFromEnd === 0) return "Finals";
      if (roundsFromEnd === 1) return "Semi Finals";
      if (roundsFromEnd === 2) return "Quarter Finals";
      if (roundsFromEnd === 3) return "Round of 16";
      if (roundsFromEnd === 4) return "Round of 32";
      if (roundsFromEnd === 5) return "Round of 64";
      return "Round " + round;
    };
  
    const { user } = useAppContext();
  
    const PlayerRow: React.FC<{ player: any; isWinner: boolean }> = ({
      player,
      isWinner,
    }) => (
      <div
        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
          isWinner
            ? "bg-gradient-to-r from-blue-500/70 to-blue-800/40 border border-blue-500/90 shadow-md shadow-blue-900/30"
            : "bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 border border-blue-400/30 shadow-lg">
            {player.image_url ? (
              <img
                className="object-cover w-full h-full rounded-full"
                src={player.image_url}
                alt={""}
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
          <div className="min-w-0">
            <span className="text-white font-semibold text-sm truncate block">
              {user?.id == player.id ? "You" : player.name}
            </span>
            {isWinner && (
              <span className="text-amber-400 text-xs font-medium">Winner</span>
            )}
          </div>
        </div>
        <span
          className={`text-sm font-bold flex-shrink-0 ml-3 ${
            isWinner ? "text-amber-300" : "text-slate-400"
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
          bgColor: "bg-slate-500/20",
          textColor: "text-slate-400",
          dotColor: "bg-slate-400",
        },
        in_progress: {
          label: "In Progress",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-300",
          dotColor: "bg-blue-400",
        },
        completed: {
          label: "Completed",
          bgColor: "bg-green-500/20",
          textColor: "text-green-300",
          dotColor: "bg-green-400",
        },
        forfeited: {
          label: "Forfeited",
          bgColor: "bg-red-500/20",
          textColor: "text-red-300",
          dotColor: "bg-red-400",
        },
      };
  
      const config =
        statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse`}
          ></div>
          <span
            className={`px-3 py-1 text-xs font-semibold ${config.bgColor} ${config.textColor} rounded-md`}
          >
            {config.label}
          </span>
        </div>
      );
    };
  
    const SpectateButton: React.FC<{ matchCode: string; roundName: string }> = ({
      matchCode,
      roundName,
    }) => {
      const navigate = useNavigate();
  
      const handleClick = () => {
        navigate(`/game/${matchCode}/spectate`, {
          state: { roundName, name: "Weekend Championship" },
        });
      };

  
      return (
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/40 flex items-center gap-2"
        >
          {/* <span>📺</span> */}
          <span>Spectate</span>
        </button>
      );
    };
  


  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 bg-gray-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if(!rounds || rounds.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-base md:text-lg">
          🏆 Bracket and rounds coming soon...
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
    {/* Mobile View */}
    <div className="lg:hidden space-y-8 py-4">
      {Array.from({ length: totalRounds }).map((_, index) => {
        const roundNumber = index + 1;
        const roundData = roundsMap.get(roundNumber);
        console.log('roundData', roundData);

        return (
          <div key={roundNumber} className="w-full">
            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r text-white fromblue-400 topurple-400 mb-5 text-center tracking-wide uppercase text-sm">
              {renderRoundName(roundNumber)}
            </h3>
            <div className="overflow-x-auto scrollbar-hide py-2">
              <div className="flex gap-4 px-2 min-w-min">
                {roundData ? (
                  roundData.matches.map((match) => (
                    <div
                      key={match.id}
                      className="flex-shrink-0 w-72 bg-slate-800/50 rounded-sm border border-slate-700/50 p-4 shadow-xl hover:shadow-2xl hover:border-slate-600 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <MatchStatus status={match.status} />
                        {match.status == "in_progress" && (
                          <SpectateButton
                            matchCode={match.game_code}
                            roundName={renderRoundName(roundNumber)}
                          />
                        )}
                      </div>
                      <div className="space-y-3">
                        <PlayerRow
                          player={match.player1}
                          isWinner={match.player1.winner}
                        />
                        {match.player2?.name && (
                          <>
                            <div className="border-t border-slate-700/50"></div>
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
                  <div className="flex-shrink-0 w-full">
                    {/* <WaitingPlaceholder /> */}
                    <></>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Desktop View */}
    <div className="hidden lg:block overflow-x-auto scrollbar-thin">
      <div className="min-w-[900px] p-6">
        <div className="flex justify-between gap-6">
          {Array.from({ length: totalRounds }).map((_, index) => {
            const roundNumber = index + 1;
            const roundData = roundsMap.get(roundNumber);

            return (
              <div key={roundNumber} className="flex-1">
                <h3 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r text-white fromblue-400 topurple-400 mb-8 tracking-wide uppercase text-sm">
                  {renderRoundName(roundNumber)}
                </h3>

                <div className="space-y-10">
                  {roundData ? (
                    roundData.matches.map((match) => (
                      <div key={match.id} className="px-2">
                        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 shadow-xl hover:shadow-2xl hover:border-slate-600 transition-all duration-300 backdrop-blur-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <MatchStatus status={match.status} />
                            {match.status == "in_progress" && (
                              <SpectateButton
                                matchCode={match.game_code}
                                roundName={renderRoundName(roundNumber)}
                              />
                            )}
                          </div>
                          <div className="space-y-3">
                            <PlayerRow
                              player={match.player1}
                              isWinner={match.player1.winner}
                            />
                            {match.player2?.name && (
                              <>
                                <div className="border-t border-slate-700/50"></div>
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
                    // <WaitingPlaceholder />
                    <></>
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
