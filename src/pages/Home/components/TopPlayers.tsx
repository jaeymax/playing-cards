import { baseUrl } from "@/config/api";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";

interface Player {
  username: string;
  rating: number;
  image_url: string | null;
  global_rank: string;
  rank: string;
  rank_color: string;
}

const TopPlayers: React.FC = () => {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const fetchTopPlayers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/leaderboard/topplayers`
      );

      if (!response.ok) {
        throw new Error(
          response.status === 500
            ? "Network error. Please check your internet connection."
            : "Failed to fetch leaderboard"
        );
      }

      const data = await response.json();

      setPlayers(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error(
        "Error fetching top players:",
        error
      );

      setError(
        error.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPlayers();
  }, []);

  /*
   * -----------------------------------------
   * RANK CONFIG
   * -----------------------------------------
   */

  const getRankConfig = (index: number) => {
    switch (index) {
      case 0:
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          rankBg: "bg-yellow-500/20",
          rankText: "text-yellow-300",
          medal: "🥇",
        };

      case 1:
        return {
          bg: "bg-slate-400/10",
          border: "border-slate-400/20",
          rankBg: "bg-slate-400/20",
          rankText: "text-slate-200",
          medal: "🥈",
        };

      case 2:
        return {
          bg: "bg-orange-600/10",
          border: "border-orange-600/20",
          rankBg: "bg-orange-600/20",
          rankText: "text-orange-300",
          medal: "🥉",
        };

      default:
        return {
          bg: "bg-gray-800/60",
          border: "border-gray-700",
          rankBg: "bg-gray-700",
          rankText: "text-gray-400",
          medal: null,
        };
    }
  };

  /*
   * -----------------------------------------
   * SKELETON
   * -----------------------------------------
   */

  const PlayerSkeleton = () => (
    <div className="flex items-center gap-3 animate-pulse">
      {/* Rank */}

      <div className="h-9 w-9 shrink-0 rounded-full bg-gray-700" />

      {/* Avatar */}

      <div className="h-10 w-10 shrink-0 rounded-full bg-gray-700" />

      {/* Player */}

      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-24 rounded bg-gray-700" />
        <div className="h-3 w-16 rounded bg-gray-700" />
      </div>

      {/* Rating */}

      <div className="h-6 w-14 rounded-lg bg-gray-700" />
    </div>
  );

  /*
   * -----------------------------------------
   * RENDER
   * -----------------------------------------
   */

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Trophy className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Top Players
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              The highest rated players
            </p>
          </div>

        </div>

        {!loading && !error && players.length > 0 && (
          <span className="rounded-full bg-gray-700 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
            Top {players.length}
          </span>
        )}

      </div>


      {/* CONTENT */}

      <div className="divide-y divide-gray-700/70">

        {/* LOADING */}

        {loading && (
          <div className="space-y-4 px-4 py-4">
            {[...Array(5)].map((_, index) => (
              <PlayerSkeleton key={index} />
            ))}
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="px-6 py-10 text-center">

            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-sm font-bold text-red-400">
                !
              </span>
            </div>

            <p className="text-sm text-gray-400">
              {error}
            </p>

            <button
              onClick={fetchTopPlayers}
              className="mt-4 rounded-xl bg-gray-700 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:bg-gray-600"
            >
              Try again
            </button>

          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          players.length === 0 && (
            <div className="px-6 py-10 text-center">

              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-700/60">
                🏆
              </div>

              <p className="text-sm font-semibold text-gray-300">
                No players yet
              </p>

              <p className="mt-1 text-xs text-gray-500">
                The leaderboard will appear here.
              </p>

            </div>
          )}


        {/* PLAYERS */}

        {!loading &&
          !error &&
          players.length > 0 &&
          players.map((player, index) => {

            const config =
              getRankConfig(index);

            return (
              <div
                key={`${player.username}-${index}`}
                onClick={() =>
                  navigate(
                    `/profile/${player.username}`
                  )
                }
                className={`
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  px-4
                  py-3
                  transition
                  hover:bg-white/[0.02]
                `}
              >

                {/* RANK */}

                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    ${config.rankBg}
                    ${config.border}
                  `}
                >

                  {config.medal ? (
                    <span className="text-base">
                      {config.medal}
                    </span>
                  ) : (
                    <span
                      className={`text-[11px] font-bold ${config.rankText}`}
                    >
                      {player.global_rank}
                    </span>
                  )}

                </div>


                {/* AVATAR */}

                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-700 bg-gray-700">

                  {player.image_url ? (
                    <img
                      src={player.image_url}
                      alt={player.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                      👤
                    </div>
                  )}

                </div>


                {/* PLAYER INFO */}

                <div className="min-w-0 flex-1">

                  <p
                    className="truncate text-sm font-bold transition group-hover:text-blue-400"
                    style={{
                      color:
                        player.rank_color ||
                        undefined,
                    }}
                  >
                    {player.username}
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">

                    <span className="text-[10px] text-gray-500">
                      #{player.global_rank}
                    </span>

                    <span className="text-gray-700">
                      •
                    </span>

                    <span className="text-[10px] text-gray-500">
                      {player.rank}
                    </span>

                  </div>

                </div>


                {/* RATING */}

                <div className="shrink-0 text-right">

                  <p className="text-sm font-black text-white">
                    {player.rating}
                  </p>

                  <p className="text-[9px] uppercase tracking-wider text-gray-600">
                    Rating
                  </p>

                </div>

              </div>
            );
          })}

      </div>


      {/* FOOTER */}

      {!loading &&
        !error &&
        players.length > 0 && (
          <div className="border-t border-gray-700 px-4 py-3">

            <Link
              to="/leaderboard"
              className="
                block
                w-full
                rounded-xl
                border
                border-blue-500/20
                bg-blue-500/10
                py-2.5
                text-center
                text-xs
                font-bold
                text-blue-400
                transition
                hover:bg-blue-500/15
                hover:text-blue-300
                active:scale-[0.98]
              "
            >
              View Full Leaderboard →
            </Link>

          </div>
        )}

    </div>
  );
};

export default TopPlayers;