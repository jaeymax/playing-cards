import React from "react";
import {
  ChevronRight,
  Medal,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LeaderboardTableProps {
  currentFilter: string;
  searchQuery: string;
  players: any[];
  loading: boolean;
}

const LeaderboardTable: React.FC<
  LeaderboardTableProps
> = ({
  players,
  loading,
}) => {
  const navigate = useNavigate();

  const getRankStyle = (rank: number) => {
    if (rank === 1)
      return {
        badge:
          "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
        icon: "🥇",
      };

    if (rank === 2)
      return {
        badge:
          "border-gray-500/30 bg-gray-500/10 text-gray-300",
        icon: "🥈",
      };

    if (rank === 3)
      return {
        badge:
          "border-orange-500/30 bg-orange-500/10 text-orange-400",
        icon: "🥉",
      };

    return {
      badge:
        "border-gray-700 bg-gray-900 text-gray-500",
      icon: null,
    };
  };

  return (
    <section>

      {/* Heading */}

      <div className="mb-4 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-black text-white">
            Rankings
          </h2>

          <p className="mt-0.5 text-xs text-gray-600">
            Complete player standings
          </p>
        </div>

        <div className="hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 sm:flex">
          <TrendingUp className="h-3.5 w-3.5" />
          Global Ranking
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">

        {/* Desktop header */}

        <div className="hidden border-b border-gray-700 bg-gray-900/50 px-5 py-3 sm:grid sm:grid-cols-[80px_minmax(0,1fr)_120px_120px_24px] sm:items-center sm:gap-3">

          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600">
            Rank
          </span>

          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600">
            Player
          </span>

          <span className="text-right text-[9px] font-bold uppercase tracking-wider text-gray-600">
            Rating
          </span>

          <span className="text-right text-[9px] font-bold uppercase tracking-wider text-gray-600">
            Win Rate
          </span>

          <span />

        </div>

        {/* Loading */}

        {loading ? (
          <div className="divide-y divide-gray-700/70">

            {[...Array(6)].map(
              (_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-4 sm:px-5"
                >
                  <div className="h-9 w-9 animate-pulse rounded-xl bg-gray-700" />

                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700" />

                  <div className="flex-1">
                    <div className="h-3.5 w-28 animate-pulse rounded bg-gray-700" />
                    <div className="mt-2 h-2.5 w-16 animate-pulse rounded bg-gray-700" />
                  </div>

                  <div className="hidden h-4 w-12 animate-pulse rounded bg-gray-700 sm:block" />

                  <div className="h-4 w-12 animate-pulse rounded bg-gray-700" />
                </div>
              )
            )}

          </div>
        ) : players?.length ? (

          <div className="divide-y divide-gray-700/70">

            {players.map(
              (
                player: any,
                index: number
              ) => {
                const rank =
                  Number(
                    player.global_rank
                  ) ||
                  index + 1;

                const rankStyle =
                  getRankStyle(rank);

                return (
                  <button
                    key={`${player.username}-${rank}-${index}`}
                    onClick={() =>
                      navigate(
                        `/profile/${player.username}`
                      )
                    }
                    className="group grid w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 text-left transition hover:bg-gray-700/30 sm:grid-cols-[80px_minmax(0,1fr)_120px_120px_24px] sm:px-5"
                  >

                    {/* Rank */}

                    <div className="flex items-center sm:justify-start">

                      <div
                        className={`flex h-9 min-w-9 items-center justify-center rounded-xl border px-1.5 text-[10px] font-black ${rankStyle.badge}`}
                      >
                        {rankStyle.icon ||
                          `#${rank}`}
                      </div>

                    </div>

                    {/* Player */}

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-700 bg-gray-700">

                        {player.image_url ? (
                          <img
                            src={
                              player.image_url
                            }
                            alt={
                              player.username
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm">
                            👤
                          </div>
                        )}

                      </div>

                      <div className="min-w-0">

                        <p
                          className="truncate text-sm font-bold"
                          style={{
                            color:
                              player.rank_color ||
                              "#fff",
                          }}
                        >
                          {player.username}
                        </p>

                        <div className="mt-0.5 flex items-center gap-2">

                          {player.rank && (
                            <span
                              className="truncate text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                color:
                                  player.rank_color ||
                                  "#6b7280",
                              }}
                            >
                              {player.rank}
                            </span>
                          )}

                          <span className="text-[9px] text-gray-700">
                            #{rank}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Rating */}

                    <div className="hidden text-right sm:block">

                      <p className="text-sm font-black text-white">
                        {player.rating}
                      </p>

                      <p className="text-[9px] text-gray-600">
                        points
                      </p>

                    </div>

                    {/* Win rate */}

                    <div className="text-right">

                      <p className="text-sm font-black text-gray-300">
                        {player.win_rate}%
                      </p>

                      <div className="mt-1 hidden h-1 w-16 overflow-hidden rounded-full bg-gray-700 sm:ml-auto sm:block">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                Number(
                                  player.win_rate
                                ) || 0
                              )
                            )}%`,
                          }}
                        />
                      </div>

                    </div>

                    {/* Arrow */}

                    <ChevronRight className="hidden h-4 w-4 text-gray-700 transition group-hover:translate-x-0.5 group-hover:text-gray-400 sm:block" />

                  </button>
                );
              }
            )}

          </div>

        ) : (

          <div className="px-6 py-16 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-700/60">
              <Medal className="h-5 w-5 text-gray-500" />
            </div>

            <h3 className="text-sm font-bold text-gray-300">
              No players found
            </h3>

            <p className="mt-1 text-xs text-gray-600">
              Try searching for another player.
            </p>

          </div>

        )}

      </div>
    </section>
  );
};

export default LeaderboardTable;