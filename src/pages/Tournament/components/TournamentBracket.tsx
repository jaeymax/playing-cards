
import { useAppContext } from "@/contexts/AppContext";
import React from "react";
import { Round, Player } from "@/types/tournament";
import { useNavigate } from "react-router-dom";

interface TournamentBracketProps {
  rounds?: Round[];
  numberOfParticipants?: number;
  loading?: boolean;
  tournamentFormat?: string;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({
  rounds = [],
  numberOfParticipants = 0,
  tournamentFormat,
  loading = false,
}) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const calculateTotalRounds = (participants: number): number => {
    if (participants <= 1) return 0;
    return Math.ceil(Math.log2(participants));
  };

  const totalRounds = calculateTotalRounds(numberOfParticipants);
  const roundsMap = new Map(rounds.map((r) => [r.round, r]));

  const renderRoundName = (round: number) => {
    if (tournamentFormat === "Swiss") {
      return `Round ${round}`;
    }

    const roundsFromEnd = totalRounds - round;

    if (roundsFromEnd === 0) return "Finals";
    if (roundsFromEnd === 1) return "Semi Finals";
    if (roundsFromEnd === 2) return "Quarter Finals";
    if (roundsFromEnd === 3) return "Round of 16";
    if (roundsFromEnd === 4) return "Round of 32";
    if (roundsFromEnd === 5) return "Round of 64";

    return `Round ${round}`;
  };

  const getRoundSubtitle = (round: number) => {
    if (tournamentFormat === "Swiss") {
      return "Swiss Stage";
    }

    const roundsFromEnd = totalRounds - round;

    if (roundsFromEnd === 0) return "Championship Match";
    if (roundsFromEnd === 1) return "Final Four";
    if (roundsFromEnd === 2) return "Final Eight";

    return "Knockout Stage";
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "in_progress":
        return {
          label: "LIVE",
          dot: "bg-blue-400",
          text: "text-blue-300",
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          glow: "shadow-blue-500/10",
        };

      case "completed":
        return {
          label: "COMPLETED",
          dot: "bg-emerald-400",
          text: "text-emerald-300",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          glow: "",
        };

      case "forfeited":
        return {
          label: "FORFEITED",
          dot: "bg-red-400",
          text: "text-red-300",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          glow: "",
        };

      default:
        return {
          label: "UPCOMING",
          dot: "bg-slate-400",
          text: "text-slate-400",
          bg: "bg-slate-500/10",
          border: "border-slate-700/60",
          glow: "",
        };
    }
  };

  const MatchStatus: React.FC<{ status: string }> = ({ status }) => {
    const config = getStatusConfig(status);

    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${config.bg} ${config.border}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${config.dot} ${
            status === "in_progress" ? "animate-pulse" : ""
          }`}
        />

        <span
          className={`text-[9px] font-bold tracking-[0.12em] ${config.text}`}
        >
          {config.label}
        </span>
      </div>
    );
  };

  const PlayerRow: React.FC<{
    player: Player;
    isWinner: boolean;
  }> = ({ player, isWinner }) => {
    const isCurrentUser = user?.id === player.id;

    return (
      <div
        className={`
          relative flex items-center justify-between
          rounded-xl border px-3 py-2.5
          transition-all duration-200
          
          ${
            isWinner
              ? "border-amber-400/30 bg-gradient-to-r from-amber-500/[0.14] via-amber-500/[0.06] to-transparent"
              : "border-white/[0.05] bg-white/[0.025] hover:border-white/[0.10] hover:bg-white/[0.04]"
          }
        `}
      >
        {/* Winner accent */}
        {isWinner && (
          <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-amber-400" />
        )}

        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div
            className={`
              relative h-9 w-9 shrink-0 overflow-hidde rounded-full 
              border
              ${
                isWinner
                  ? "border-amber-400/40 shadow-lg shadow-amber-500/10"
                  : "border-white/10"
              }
            `}
          >
            {player.image_url ? (
              <img
                src={player.image_url}
                alt=""
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <div className="flex h-full w-full items-center rounded-full justify-center bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-bold text-slate-300">
                {player.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}

            {isWinner && (
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-900 bg-amber-400 text-[8px] font-black text-slate-950">
                ✓
              </div>
            )}
          </div>

          {/* Name */}
          <div className="min-w-0">
            <div
              className={`truncate text-xs font-semibold ${
                isWinner ? "text-white" : "text-slate-300"
              }`}
            >
              {isCurrentUser ? "You" : player.name}
            </div>

            {isWinner && (
              <div className="mt-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-amber-400">
                <span>Winner</span>
              </div>
            )}
          </div>
        </div>

        {/* Score */}
        <div
          className={`ml-3 min-w-[24px] text-right text-sm font-black tabular-nums ${
            isWinner ? "text-amber-300" : "text-slate-500"
          }`}
        >
          {player.score}
        </div>
      </div>
    );
  };

  const SpectateButton: React.FC<{
    matchCode: string;
    roundName: string;
  }> = ({ matchCode, roundName }) => {
    const handleClick = () => {
      navigate(`/game/${matchCode}/spectate`, {
        state: {
          roundName,
          name: "Weekend Championship",
        },
      });
    };

    return (
      <button
        onClick={handleClick}
        className="
          group inline-flex items-center gap-1.5
          rounded-lg border border-blue-400/20
          bg-blue-500/10 px-2.5 py-1.5
          text-[10px] font-bold uppercase tracking-wider text-blue-300
          transition-all duration-200
          hover:border-blue-400/40
          hover:bg-blue-500/20
          hover:text-blue-200
        "
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
        </span>

        <span>Watch</span>

        <span className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>
    );
  };

  const MatchCard: React.FC<{
    match: any;
    roundNumber: number;
    matchIndex: number;
  }> = ({ match, roundNumber, matchIndex }) => {
    const isLive = match.status === "in_progress";
    const isFinal = roundNumber === totalRounds;

    return (
      <div
        className={`
          group relative overflow-hidden rounded-2xl
          border border-white/[0.07]
          bg-[#111722]/40
          shadow-xl shadow-black/20
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-0.5
          hover:border-white/[0.13]
          hover:shadow-2xl hover:shadow-black/30
          ${isLive ? "border-blue-500/20 shadow-blue-500/[0.05]" : ""}
        `}
      >
        {/* Top glow */}
        <div
          className={`
            absolute inset-x-0 top-0 h-px
            ${
              isLive
                ? "bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                : isFinal
                ? "bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
            }
          `}
        />

        {/* Match header */}
        <div className="flex items-center justify-between border-b border-white/[0.05] px-3.5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
              Match
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white/[0.05] px-1.5 text-[9px] font-bold text-slate-400">
              {matchIndex + 1}
            </span>
          </div>

          <MatchStatus status={match.status} />
        </div>

        {/* Players */}
        <div className="space-y-2 p-3">
          <PlayerRow
            player={match.player1}
            isWinner={match.player1.winner}
          />

          {match.player2?.name ? (
            <>
              <div className="relative flex items-center justify-center">
                <div className="absolute left-0 right-0 h-px bg-white/[0.04]" />

                <span className="relative z-10 rounded-md border border-white/[0.05] bg-[#111722] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-600">
                  vs
                </span>
              </div>

              <PlayerRow
                player={match.player2}
                isWinner={match.player2.winner}
              />
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-white/[0.07] bg-white/[0.015] px-3 py-3 text-center">
              <span className="text-[10px] font-medium text-slate-600">
                Awaiting opponent
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        {isLive && (
          <div className="flex items-center justify-between border-t border-white/[0.05] bg-blue-500/[0.025] px-3.5 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-300">
                Match in progress
              </span>
            </div>

          {
            match.player1.id != user?.id && match.player2.id != user?.id && (
              <SpectateButton
                matchCode={match.game_code}
                roundName={renderRoundName(roundNumber)}
              />

            )
          }
          </div>
        )}

        {match.status === "completed" && isFinal && (
          <div className="flex items-center justify-center gap-1.5 border-t border-amber-400/10 bg-amber-400/[0.025] px-3 py-2">
            <span className="text-[10px]">🏆</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400/80">
              Championship Match
            </span>
          </div>
        )}
      </div>
    );
  };

  const WaitingPlaceholder: React.FC = () => (
    <div
      className="
        flex min-h-[180px] items-center justify-center
        rounded-2xl border border-dashed border-white/[0.07]
        bg-white/[0.015]
      "
    >
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.025]">
          <span className="text-sm text-slate-600">⌛</span>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          Waiting for next round
        </p>

        <p className="mt-1 text-[9px] text-slate-700">
          Matches will appear here
        </p>
      </div>
    </div>
  );

  const BracketSkeleton: React.FC = () => (
    <div className="space-y-8">
      <div className="flex gap-6 overflow-hidden px-4 py-4">
        {Array.from({ length: 3 }).map((_, roundIndex) => (
          <div
            key={roundIndex}
            className="min-w-[280px] flex-1 space-y-5"
          >
            <div className="mx-auto h-10 w-36 animate-pulse rounded-xl bg-white/[0.05]" />

            {Array.from({ length: roundIndex === 0 ? 3 : 2 }).map(
              (_, matchIndex) => (
                <div
                  key={matchIndex}
                  className="rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3"
                >
                  <div className="mb-3 h-4 w-20 animate-pulse rounded bg-white/[0.05]" />

                  <div className="space-y-2">
                    <div className="h-12 animate-pulse rounded-xl bg-white/[0.04]" />
                    <div className="h-12 animate-pulse rounded-xl bg-white/[0.04]" />
                  </div>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b1018]">
        <BracketSkeleton />
      </div>
    );
  }

  if (!rounds || rounds.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#0b1018 px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.025]">
          <span className="text-2xl">🏆</span>
        </div>

        <h3 className="text-sm font-bold text-slate-300">
          Bracket coming soon
        </h3>

        <p className="mx-auto mt-1.5 max-w-xs text-xs text-slate-600">
          The tournament bracket will appear here once the rounds have been
          generated.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between px-1">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Tournament Bracket
            </span>
          </div>

          <h2 className="text-lg font-black tracking-tight text-white">
            {tournamentFormat === "Swiss"
              ? "Swiss Stage"
              : "Championship Bracket"}
          </h2>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
            {numberOfParticipants} Players
          </p>

          <p className="mt-0.5 text-[10px] text-slate-500">
            {tournamentFormat === "Swiss"
              ? "Swiss Format"
              : `${totalRounds} Rounds`}
          </p>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="space-y-7">
          {Array.from({ length: totalRounds }).map((_, index) => {
            const roundNumber = index + 1;
            const roundData = roundsMap.get(roundNumber);

            return (
              <section key={roundNumber}>
                {/* Round heading */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/10 bg-blue-500/[0.08] text-[10px] font-black text-blue-300">
                    {String(roundNumber).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      {renderRoundName(roundNumber)}
                    </h3>

                    <p className="mt-0.5 text-[9px] text-slate-600">
                      {getRoundSubtitle(roundNumber)}
                    </p>
                  </div>

                  <div className="ml-auto h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
                </div>

                <div className="space-y-3">
                  {roundData ? (
                    roundData.matches.map((match, matchIndex) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        roundNumber={roundNumber}
                        matchIndex={matchIndex}
                      />
                    ))
                  ) : (
                    <WaitingPlaceholder />
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
        <div className="min-w-[980px] px-2 pb-6 pt-2">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${totalRounds}, minmax(250px, 1fr))`,
            }}
          >
            {Array.from({ length: totalRounds }).map((_, index) => {
              const roundNumber = index + 1;
              const roundData = roundsMap.get(roundNumber);

              return (
                <section key={roundNumber} className="min-w-0">
                  {/* Round header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className={`
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-xl border text-[10px] font-black
                        ${
                          roundNumber === totalRounds
                            ? "border-amber-400/20 bg-amber-400/[0.08] text-amber-300"
                            : "border-blue-400/10 bg-blue-500/[0.08] text-blue-300"
                        }
                      `}
                    >
                      {String(roundNumber).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-black uppercase tracking-wider text-white">
                        {renderRoundName(roundNumber)}
                      </h3>

                      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
                        {getRoundSubtitle(roundNumber)}
                      </p>
                    </div>
                  </div>

                  {/* Connector line */}
                  <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-blue-500/20 via-white/[0.04] to-transparent" />

                    <div
                      className={`
                        space-y-6 pl-3
                        ${
                          roundNumber > 1
                            ? "pt-[var(--round-offset)]"
                            : ""
                        }
                      `}
                      style={
                        roundNumber > 1
                          ? ({
                              "--round-offset": `${Math.min(
                                70,
                                (roundNumber - 1) * 24
                              )}px`,
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {roundData ? (
                        roundData.matches.map((match, matchIndex) => (
                          <div key={match.id} className="relative">
                            {/* Incoming connector */}
                            {roundNumber > 1 && (
                              <div className="absolute -left-3 top-1/2 hidden h-px w-3 bg-white/[0.08] xl:block" />
                            )}

                            <MatchCard
                              match={match}
                              roundNumber={roundNumber}
                              matchIndex={matchIndex}
                            />

                            {/* Outgoing connector */}
                            {roundNumber < totalRounds && (
                              <div className="absolute -right-3 top-1/2 hidden h-px w-3 bg-white/[0.08] xl:block" />
                            )}
                          </div>
                        ))
                      ) : (
                        <WaitingPlaceholder />
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;

